"use client";

/**
 * Injects minimal layout CSS if Tailwind/globals fail to load (e.g. dev cache glitch).
 */
export function CriticalStyleFallback() {
  return (
    <style
      id="critical-style-fallback"
      dangerouslySetInnerHTML={{
        __html: `
          html { -webkit-text-size-adjust: 100%; }
          body {
            margin: 0;
            min-height: 100vh;
            background: #fafbfe;
            color: #1a1a2e;
            line-height: 1.5;
            font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
          }
          img, video { max-width: 100%; height: auto; }
          a { color: #1557a0; }
          ul { list-style: none; padding: 0; margin: 0; }
          button, input, select, textarea {
            font: inherit;
            max-width: 100%;
          }
        `,
      }}
    />
  );
}
