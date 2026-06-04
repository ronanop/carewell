/** Session flag — cleared once Tailwind/globals are confirmed loaded. */
export const CSS_RECOVERY_STORAGE_KEY = "carewell-css-recovery-v1";

/** True when globals.css + Tailwind utilities are active in the DOM. */
export function isTailwindActive(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return true;

  const primary = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim();
  if (!primary) return false;

  const probe = document.createElement("div");
  probe.className = "hidden";
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  document.documentElement.appendChild(probe);
  const hidden = window.getComputedStyle(probe).display === "none";
  probe.remove();

  return hidden;
}

export function reloadNextStylesheets(): void {
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
  links.forEach((link) => {
    const href = link.href;
    if (!href || href.includes("critical-style-fallback")) return;
    const fresh = document.createElement("link");
    fresh.rel = "stylesheet";
    fresh.href = `${href.split("?")[0]}?recover=${Date.now()}`;
    link.after(fresh);
  });
}

export type CssRecoveryOptions = {
  soft?: boolean;
  delays?: number[];
};

export function runCssRecoveryCheck(options: CssRecoveryOptions = {}): void {
  const { soft = false, delays = soft ? [120, 600] : [80, 400, 1200, 2500] } = options;

  const evaluate = (attempt: number) => {
    if (isTailwindActive()) {
      try {
        sessionStorage.removeItem(CSS_RECOVERY_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      return;
    }

    if (!soft && attempt === 0) {
      reloadNextStylesheets();
    }

    const isLast = attempt >= delays.length - 1;
    if (!isLast) return;

    try {
      if (sessionStorage.getItem(CSS_RECOVERY_STORAGE_KEY)) return;
      sessionStorage.setItem(CSS_RECOVERY_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }

    window.location.reload();
  };

  delays.forEach((delay, index) => {
    window.setTimeout(() => evaluate(index), delay);
  });
}

/** Inline guard for root layout — must stay self-contained (no imports). */
export const CSS_GUARD_INLINE_SCRIPT = `
(function () {
  var KEY = "${CSS_RECOVERY_STORAGE_KEY}";
  if (location.pathname.indexOf("/admin") === 0) return;
  function broken() {
    var root = document.documentElement;
    var primary = window.getComputedStyle(root).getPropertyValue("--color-primary").trim();
    if (!primary) return true;
    var probe = document.createElement("div");
    probe.className = "hidden";
    probe.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    root.appendChild(probe);
    var ok = window.getComputedStyle(probe).display === "none";
    probe.remove();
    return !ok;
  }
  function recover() {
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch (e) {}
    location.reload();
  }
  function check() {
    if (!broken()) {
      try { sessionStorage.removeItem(KEY); } catch (e) {}
      return;
    }
    recover();
  }
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(check, 50);
    setTimeout(check, 900);
  });
  document.addEventListener("error", function (ev) {
    var t = ev.target;
    if (t && t.tagName === "LINK" && t.rel === "stylesheet") recover();
  }, true);
})();
`;
