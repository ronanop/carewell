const BASE = process.env.SEO_AUDIT_BASE_URL || "http://localhost:3000";

const paths = [
  "/",
  "/blog",
  "/about/dr-bhasin",
  "/hair-transplant-in-delhi",
  "/hi/services/hair-transplant-hi",
  "/treatments/hair",
  "/locations/hair-transplant-faridabad",
];

function checkContains(html, text) {
  return html.toLowerCase().includes(text.toLowerCase());
}

function isServicePath(path) {
  return path.startsWith("/services/") || path === "/hair-transplant-in-delhi";
}

async function audit(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url);
  const html = await res.text();

  return {
    path,
    status: res.status,
    canonical: checkContains(html, 'rel="canonical"'),
    breadcrumbSchema: checkContains(html, '"@type":"BreadcrumbList"'),
    faqSchema: isServicePath(path) ? checkContains(html, '"@type":"FAQPage"') : true,
    medicalProcedureSchema: isServicePath(path)
      ? checkContains(html, '"@type":"MedicalProcedure"')
      : true,
    blogPostingSchema: path.startsWith("/blog/") && path !== "/blog"
      ? checkContains(html, '"@type":"BlogPosting"')
      : true,
    hreflangHi: isServicePath(path)
      ? checkContains(html, 'hreflang="hi-IN"')
      : true,
  };
}

async function main() {
  const rows = [];
  for (const path of paths) {
    try {
      rows.push(await audit(path));
    } catch (err) {
      rows.push({ path, status: "ERROR", error: String(err) });
    }
  }

  console.table(rows);
  const failures = rows.filter((r) =>
    r.status !== 200 ||
    r.canonical === false ||
    r.breadcrumbSchema === false ||
    r.faqSchema === false ||
    r.medicalProcedureSchema === false ||
    r.blogPostingSchema === false ||
    r.hreflangHi === false
  );

  if (failures.length) {
    console.error(`SEO audit failed for ${failures.length} route(s).`);
    process.exit(1);
  }
  console.log("SEO audit passed.");
}

main();

