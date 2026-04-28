// Prerender static HTML pages for every document, chapter, and section in the
// CCC Study app, plus a sitemap.xml. The hydrated SPA replaces the body
// content after first paint; the prerender exists purely to give Googlebot
// (and other crawlers / link previews) real, indexable content per URL.
//
// Approach: pure Node script — no headless browser, no SSR. We reuse the
// existing Vite-built `dist/index.html` shell and inject per-page head tags +
// a static body block (`<div id="prerender-content">…</div>`) immediately
// before `<div id="root"></div>`. When React hydrates, it renders into
// `#root`; the prerendered block stays in the DOM but is hidden once the SPA
// is ready, so it doesn't double up visually.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SITE = "https://ccc-study.org";

// --- Load the data files (ESM) ---------------------------------------------
const { CONFESSIONS } = await import(join(ROOT, "src/data/confessions.js"));
const { CONFESSIONS_DE } = await import(join(ROOT, "src/data/confessions_de.js"));
const { CONFESSIONS_DE_EXTRA } = await import(join(ROOT, "src/data/confessions_de_extra.js"));
const { DOC_IDS, DOC_ID_TO_EN_NAME } = await import(join(ROOT, "src/utils/anchors.js"));

const CONFESSIONS_DE_ALL = { ...CONFESSIONS_DE, ...CONFESSIONS_DE_EXTRA };

// English → German confession name mapping (mirrors App.jsx EN_TO_DE_KEY).
const EN_TO_DE_KEY = {
  "Westminster Confession of Faith": "Westminsterbekenntnis",
  "Heidelberg Catechism": "Heidelberger Katechismus",
  "Augsburg Confession": "Augsburger Bekenntnis",
  "1689 Baptist Confession": "Baptistisches Bekenntnis von 1689",
  "Nicene Creed": "Nicänisches Glaubensbekenntnis",
  "Apostles' Creed": "Apostolisches Glaubensbekenntnis",
  "Athanasian Creed": "Athanasianisches Glaubensbekenntnis",
  "Definition of Chalcedon": "Definition von Chalcedon",
  "First Council of Constantinople — Canons": "Erstes Konzil von Konstantinopel — Kanones",
  "Second Council of Constantinople — Anathemas": "Zweites Konzil von Konstantinopel — Anathemata",
  "Third Council of Constantinople — Definition of Faith": "Drittes Konzil von Konstantinopel — Glaubensdefinition",
  "Longer Catechism (Orthodox)": "Orthodoxer Katechismus",
  "39 Articles": "39 Artikel der Kirche von England",
  "Roman Catechism": "Römischer Katechismus",
};

// English doc-name → docId (built by inverting DOC_ID_TO_EN_NAME).
const EN_NAME_TO_DOC_ID = Object.fromEntries(
  Object.entries(DOC_ID_TO_EN_NAME).map(([id, en]) => [en, id])
);

// --- Helpers ---------------------------------------------------------------
function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s) { return escapeHtml(s); }

function buildPath({ docId, chapter, section, lang }) {
  const prefix = lang === "de" ? "/de" : "";
  if (!docId) return prefix + "/browse";
  const parts = [prefix, "browse", docId];
  if (chapter !== undefined && chapter !== null && chapter !== "") {
    parts.push(String(chapter));
    if (section !== undefined && section !== null && section !== "") {
      parts.push(String(section));
    }
  }
  return parts.join("/").replace(/\/+/g, "/");
}

function buildAnchorId({ docId, chapter, section }) {
  if (!docId) return null;
  const parts = [docId];
  if (chapter !== undefined && chapter !== null && chapter !== "") {
    parts.push("ch" + chapter);
    if (section !== undefined && section !== null && section !== "") {
      parts.push("s" + section);
    }
    return parts.join("-");
  }
  return "doc-" + docId;
}

function shorten(text, max = 200) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/[\s,;:.]+\S*$/, "") + "…";
}

// Build a {confession, lang, docId} list of all renderable documents.
function collectDocs() {
  const docs = [];
  for (const enName of Object.keys(CONFESSIONS)) {
    const docId = EN_NAME_TO_DOC_ID[enName];
    if (!docId) continue;
    docs.push({ lang: "en", name: enName, conf: CONFESSIONS[enName], docId });
    const deName = EN_TO_DE_KEY[enName];
    if (deName && CONFESSIONS_DE_ALL[deName]) {
      docs.push({ lang: "de", name: deName, conf: CONFESSIONS_DE_ALL[deName], docId });
    }
  }
  return docs;
}

// --- Page templates --------------------------------------------------------
function jsonLdWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Creeds, Confessions and Catechism Research",
    alternateName: "CCC Study",
    url: SITE,
    inLanguage: ["en", "de"],
    description:
      "Explore historic Christian creeds, confessions, and catechisms across traditions. AI-powered research, commentary, and cross-tradition comparison.",
    potentialAction: {
      "@type": "SearchAction",
      target: SITE + "/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

function jsonLdDoc({ name, conf, docId, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name,
    inLanguage: conf.lang || (url.includes("/de/") ? "de" : "en"),
    url,
    datePublished: String(conf.year || ""),
    about: conf.tradition || "Christian theology",
    isPartOf: {
      "@type": "WebSite",
      name: "CCC Study",
      url: SITE,
    },
    identifier: docId,
  };
}

function jsonLdChapter({ name, conf, docId, chapter, url, parentUrl }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${name} — ${chapterLabel(url)} ${chapter.number}: ${chapter.title}`,
    inLanguage: url.includes("/de/") ? "de" : "en",
    url,
    isPartOf: { "@type": "Book", name, url: parentUrl, identifier: docId },
    articleSection: chapter.title,
    datePublished: String(conf.year || ""),
  };
}

function chapterLabel(url) {
  return url.includes("/de/") ? "Kapitel" : "Chapter";
}

function sectionLabel(url) {
  return url.includes("/de/") ? "Abschnitt" : "Section";
}

function renderHead({ title, description, canonical, alternates, jsonld }) {
  const altLinks = alternates
    .map(
      ({ hreflang, href }) =>
        `<link rel="alternate" hreflang="${escapeAttr(hreflang)}" href="${escapeAttr(href)}" />`
    )
    .join("\n    ");
  const jsonldBlocks = (Array.isArray(jsonld) ? jsonld : [jsonld])
    .filter(Boolean)
    .map(
      (obj) =>
        `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`
    )
    .join("\n    ");
  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    ${altLinks}
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:site_name" content="CCC Study" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    ${jsonldBlocks}`.trim();
}

// Renders a static body block. The CSS hides it once React mounts (hydration
// removes the marker via JS). It contains real, crawlable text so Googlebot
// can index the passage even before JS runs.
function renderPrerenderBody({ title, breadcrumb, paragraphs, navLinks }) {
  const breadcrumbHtml = breadcrumb
    .map((b, i) => {
      const sep = i > 0 ? '<span style="color:#aaa"> › </span>' : "";
      return `${sep}<a href="${escapeAttr(b.href)}" style="color:#5a4a2a;text-decoration:none">${escapeHtml(b.label)}</a>`;
    })
    .join("");
  const navHtml = (navLinks || [])
    .map(
      (n) =>
        `<li><a href="${escapeAttr(n.href)}" style="color:#5a4a2a;text-decoration:none">${escapeHtml(n.label)}</a></li>`
    )
    .join("");
  const paraHtml = paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n        ");

  return `
    <noscript style="display:block;padding:20px;background:#fdf6e3;color:#7a2a2a;border:1px solid #e8d9a0;margin:0 auto;max-width:760px">
      This site requires JavaScript for the interactive features (AI research, comparison, notebook). The text below is statically rendered for reading.
    </noscript>
    <div id="prerender-content" style="font-family:Georgia,serif;max-width:760px;margin:0 auto;padding:24px 20px;color:#2c2416;line-height:1.7">
      <nav style="font-size:12px;color:#8a7a5a;margin-bottom:16px">${breadcrumbHtml}</nav>
      <h1 style="font-size:22px;margin:0 0 12px;color:#2c2416">${escapeHtml(title)}</h1>
      <div style="font-size:15px">
        ${paraHtml}
      </div>
      ${navHtml ? `<nav aria-label="Sub-navigation" style="margin-top:24px;border-top:1px solid #d4c4a0;padding-top:14px"><ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:6px;font-size:13px">${navHtml}</ul></nav>` : ""}
    </div>
    <style>
      /* Once React hydrates, hide the static prerender block to avoid duplicate
         content visually. The block remains in the DOM for crawlers that read
         the HTML before executing JS. */
      .cccr-spa-ready #prerender-content { display: none; }
    </style>`;
}

// --- HTML emitter ----------------------------------------------------------
async function emitHtml(filePath, headHtml, bodyHtml, shellHtml) {
  // Inject head: replace existing <title> + meta description with ours, leave
  // the rest of the shell intact (script, viewport, google verification, etc.).
  let html = shellHtml;
  // Strip existing <title> and primary meta tags so per-page values win.
  html = html.replace(/<title>[^<]*<\/title>/i, "");
  html = html.replace(/<meta\s+name="description"[^>]*\/?>/i, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*\/?>/i, "");
  html = html.replace(/<meta\s+property="og:[^"]+"[^>]*\/?>/gi, "");
  html = html.replace(/<meta\s+name="twitter:[^"]+"[^>]*\/?>/gi, "");
  // Insert before </head>
  html = html.replace("</head>", `    ${headHtml}\n  </head>`);
  // Insert prerender body before <div id="root">
  html = html.replace(
    /<div id="root"><\/div>/,
    `${bodyHtml}\n    <div id="root"></div>`
  );
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, html, "utf8");
}

// --- Main ------------------------------------------------------------------
async function main() {
  if (!existsSync(DIST)) {
    console.error("dist/ missing — run `vite build` first.");
    process.exit(1);
  }
  const shellPath = join(DIST, "index.html");
  const shellHtml = await readFile(shellPath, "utf8");

  const docs = collectDocs();
  const sitemapEntries = [];

  // Add a small inline script to the shell that flips a class once React
  // hydrates so the prerender block can be hidden.
  const hydrationFlag = `<script>window.addEventListener('DOMContentLoaded',function(){setTimeout(function(){document.documentElement.classList.add('cccr-spa-ready');},120);});</script>`;
  const augmentedShell = shellHtml.replace("</head>", `    ${hydrationFlag}\n  </head>`);

  // -------- Homepage (overwrite dist/index.html) --------
  {
    const url = SITE + "/";
    const altDe = SITE + "/de/";
    const head = renderHead({
      title: "Creeds, Confessions and Catechism Research",
      description:
        "Explore historic Christian creeds, confessions, and catechisms across traditions. AI-powered research, cross-tradition comparison, and per-passage commentary.",
      canonical: url,
      alternates: [
        { hreflang: "en", href: url },
        { hreflang: "de", href: altDe },
        { hreflang: "x-default", href: url },
      ],
      jsonld: jsonLdWebSite(),
    });
    const body = renderPrerenderBody({
      title: "Creeds, Confessions and Catechism Research",
      breadcrumb: [{ label: "Home", href: "/" }],
      paragraphs: [
        "A research library of historic Christian creeds, confessions, and catechisms — Reformed, Lutheran, Catholic, Baptist, Anglican, Orthodox, and the ecumenical creeds — with AI-powered research and side-by-side comparison.",
        "Browse the full text of every document, ask questions and get tradition-aware answers with citations, or compare doctrines across traditions in a single table.",
      ],
      navLinks: docs
        .filter((d) => d.lang === "en")
        .map((d) => ({
          label: d.name,
          href: buildPath({ docId: d.docId, lang: "en" }),
        })),
    });
    await emitHtml(join(DIST, "index.html"), head, body, augmentedShell);
    sitemapEntries.push({
      loc: url,
      priority: 1.0,
      alternates: [
        { hreflang: "en", href: url },
        { hreflang: "de", href: altDe },
      ],
    });
    sitemapEntries.push({
      loc: altDe,
      priority: 0.9,
      alternates: [
        { hreflang: "en", href: url },
        { hreflang: "de", href: altDe },
      ],
    });
  }

  // -------- /de/ index (German homepage) --------
  {
    const url = SITE + "/de/";
    const altEn = SITE + "/";
    const head = renderHead({
      title: "Glaubensbekenntnisse, Bekenntnisse und Katechismen — Forschung",
      description:
        "Historische christliche Glaubensbekenntnisse, Bekenntnisse und Katechismen erkunden. KI-gestützte Forschung, traditionsübergreifender Vergleich und passagenweiser Kommentar.",
      canonical: url,
      alternates: [
        { hreflang: "en", href: altEn },
        { hreflang: "de", href: url },
        { hreflang: "x-default", href: altEn },
      ],
      jsonld: jsonLdWebSite(),
    });
    const body = renderPrerenderBody({
      title: "Glaubensbekenntnisse, Bekenntnisse und Katechismen",
      breadcrumb: [{ label: "Startseite", href: "/de/" }],
      paragraphs: [
        "Eine Forschungsbibliothek historischer christlicher Glaubensbekenntnisse, Bekenntnisse und Katechismen — reformiert, lutherisch, katholisch, baptistisch, anglikanisch, orthodox und die ökumenischen Bekenntnisse.",
      ],
      navLinks: docs
        .filter((d) => d.lang === "de")
        .map((d) => ({
          label: d.name,
          href: buildPath({ docId: d.docId, lang: "de" }),
        })),
    });
    await emitHtml(join(DIST, "de/index.html"), head, body, augmentedShell);
  }

  // -------- All-documents pages --------
  for (const lng of ["en", "de"]) {
    const path = lng === "de" ? "/de/all-documents" : "/all-documents";
    const url = SITE + path;
    const altOther = lng === "de" ? SITE + "/all-documents" : SITE + "/de/all-documents";
    const isDe = lng === "de";
    const head = renderHead({
      title: isDe
        ? "Alle Dokumente — Verzeichnis | CCC Study"
        : "All Documents — Index | CCC Study",
      description: isDe
        ? "Alle historischen christlichen Glaubensbekenntnisse, Bekenntnisse und Katechismen mit Links zu jedem Kapitel."
        : "Every historic Christian creed, confession, and catechism with links to each chapter, question, article, and canon.",
      canonical: url,
      alternates: [
        { hreflang: "en", href: SITE + "/all-documents" },
        { hreflang: "de", href: SITE + "/de/all-documents" },
      ],
      jsonld: null,
    });
    const navLinks = [];
    for (const d of docs.filter((x) => x.lang === lng)) {
      navLinks.push({ label: d.name, href: buildPath({ docId: d.docId, lang: lng }) });
      for (const ch of d.conf.chapters) {
        navLinks.push({
          label: `${d.name} — ${isDe ? "Kapitel" : "Chapter"} ${ch.number}: ${ch.title}`,
          href: buildPath({ docId: d.docId, chapter: ch.number, lang: lng }),
        });
      }
    }
    const body = renderPrerenderBody({
      title: isDe ? "Alle Dokumente — Verzeichnis" : "All Documents — Index",
      breadcrumb: [
        { label: isDe ? "Startseite" : "Home", href: isDe ? "/de/" : "/" },
        { label: isDe ? "Alle Dokumente" : "All Documents", href: path },
      ],
      paragraphs: [
        isDe
          ? "Alle Glaubensbekenntnisse, Bekenntnisse und Katechismen dieser Bibliothek, mit direkten Links zu jedem Kapitel, jeder Frage, jedem Artikel und jedem Kanon."
          : "Every creed, confession, and catechism in this library, with direct links to each chapter, question, article, and canon.",
      ],
      navLinks,
    });
    await emitHtml(
      join(DIST, lng === "de" ? "de/all-documents/index.html" : "all-documents/index.html"),
      head,
      body,
      augmentedShell
    );
    sitemapEntries.push({
      loc: url,
      priority: 0.6,
      alternates: [
        { hreflang: "en", href: SITE + "/all-documents" },
        { hreflang: "de", href: SITE + "/de/all-documents" },
      ],
    });
  }

  // -------- Per-document, per-chapter, per-section pages --------
  for (const d of docs) {
    const { lang, name, conf, docId } = d;
    const enName = DOC_ID_TO_EN_NAME[docId];
    const deName = EN_TO_DE_KEY[enName];

    const docPath = buildPath({ docId, lang });
    const docUrl = SITE + docPath;
    const altEn = SITE + buildPath({ docId, lang: "en" });
    const altDe = deName && CONFESSIONS_DE_ALL[deName]
      ? SITE + buildPath({ docId, lang: "de" })
      : null;
    const alternates = [{ hreflang: "en", href: altEn }];
    if (altDe) alternates.push({ hreflang: "de", href: altDe });
    alternates.push({ hreflang: "x-default", href: altEn });

    // Document landing page
    {
      const title = `${name} (${conf.year}) — ${conf.tradition} | CCC Study`;
      const description = shorten(
        `${name}, a ${conf.tradition} confession dated ${conf.year}. Browse all ${conf.chapters.length} chapters with cross-tradition comparison and AI-powered commentary on every passage.`,
        300
      );
      const head = renderHead({
        title,
        description,
        canonical: docUrl,
        alternates,
        jsonld: jsonLdDoc({ name, conf, docId, url: docUrl }),
      });
      const body = renderPrerenderBody({
        title: `${name} — ${conf.year}`,
        breadcrumb: [
          { label: lang === "de" ? "Startseite" : "Home", href: lang === "de" ? "/de/" : "/" },
          {
            label: lang === "de" ? "Alle Dokumente" : "All Documents",
            href: lang === "de" ? "/de/all-documents" : "/all-documents",
          },
          { label: name, href: docPath },
        ],
        paragraphs: [
          `${name} (${conf.year}) — a ${conf.tradition} confession.`,
          `This document contains ${conf.chapters.length} chapters. Each chapter and section is individually linkable for citation and study.`,
        ],
        navLinks: conf.chapters.map((ch) => ({
          label: `${chapterLabel(docUrl)} ${ch.number}: ${ch.title}`,
          href: buildPath({ docId, chapter: ch.number, lang }),
        })),
      });
      await emitHtml(join(DIST, docPath, "index.html"), head, body, augmentedShell);
      sitemapEntries.push({
        loc: docUrl,
        priority: 0.9,
        alternates: alternates.filter((a) => a.hreflang !== "x-default"),
      });
    }

    // Chapter and section pages
    for (const ch of conf.chapters) {
      const chPath = buildPath({ docId, chapter: ch.number, lang });
      const chUrl = SITE + chPath;
      const chAltEn = SITE + buildPath({ docId, chapter: ch.number, lang: "en" });
      const chAltDe = altDe ? SITE + buildPath({ docId, chapter: ch.number, lang: "de" }) : null;
      const chAlts = [{ hreflang: "en", href: chAltEn }];
      if (chAltDe) chAlts.push({ hreflang: "de", href: chAltDe });

      const chTitle = `${name} — ${chapterLabel(chUrl)} ${ch.number}: ${ch.title} | CCC Study`;
      const firstSecText = ch.sections?.[0]?.text || "";
      const chDesc = shorten(`${name}, ${chapterLabel(chUrl)} ${ch.number} (${ch.title}). ${firstSecText}`, 300);

      const head = renderHead({
        title: chTitle,
        description: chDesc,
        canonical: chUrl,
        alternates: chAlts,
        jsonld: jsonLdChapter({ name, conf, docId, chapter: ch, url: chUrl, parentUrl: docUrl }),
      });
      const paragraphs = [];
      paragraphs.push(`${chapterLabel(chUrl)} ${ch.number}: ${ch.title}`);
      for (const s of ch.sections || []) {
        paragraphs.push(`${sectionLabel(chUrl)} ${s.number}. ${s.text}`);
      }
      const body = renderPrerenderBody({
        title: `${name} — ${chapterLabel(chUrl)} ${ch.number}: ${ch.title}`,
        breadcrumb: [
          { label: lang === "de" ? "Startseite" : "Home", href: lang === "de" ? "/de/" : "/" },
          { label: name, href: docPath },
          { label: `${chapterLabel(chUrl)} ${ch.number}`, href: chPath },
        ],
        paragraphs,
        navLinks: (ch.sections || []).map((s) => ({
          label: `${sectionLabel(chUrl)} ${s.number}`,
          href: buildPath({ docId, chapter: ch.number, section: s.number, lang }),
        })),
      });
      await emitHtml(join(DIST, chPath, "index.html"), head, body, augmentedShell);
      sitemapEntries.push({ loc: chUrl, priority: 0.7, alternates: chAlts });

      // Section pages
      for (const s of ch.sections || []) {
        const secPath = buildPath({ docId, chapter: ch.number, section: s.number, lang });
        const secUrl = SITE + secPath;
        const secAltEn = SITE + buildPath({ docId, chapter: ch.number, section: s.number, lang: "en" });
        const secAltDe = altDe ? SITE + buildPath({ docId, chapter: ch.number, section: s.number, lang: "de" }) : null;
        const secAlts = [{ hreflang: "en", href: secAltEn }];
        if (secAltDe) secAlts.push({ hreflang: "de", href: secAltDe });

        const secTitle = `${name} ${ch.number}.${s.number}: ${shorten(ch.title, 60)} | CCC Study`;
        const secDesc = shorten(`${name}, ${chapterLabel(secUrl)} ${ch.number} ${sectionLabel(secUrl)} ${s.number}. ${s.text}`, 300);

        const secJsonld = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${name} ${ch.number}.${s.number}`,
          inLanguage: lang,
          url: secUrl,
          isPartOf: { "@type": "Article", url: chUrl, name: `${name} — ${chapterLabel(chUrl)} ${ch.number}: ${ch.title}` },
          articleBody: s.text,
          datePublished: String(conf.year || ""),
        };
        const head2 = renderHead({
          title: secTitle,
          description: secDesc,
          canonical: secUrl,
          alternates: secAlts,
          jsonld: secJsonld,
        });
        const body2 = renderPrerenderBody({
          title: `${name} ${ch.number}.${s.number}`,
          breadcrumb: [
            { label: lang === "de" ? "Startseite" : "Home", href: lang === "de" ? "/de/" : "/" },
            { label: name, href: docPath },
            { label: `${chapterLabel(chUrl)} ${ch.number}: ${ch.title}`, href: chPath },
            { label: `${sectionLabel(chUrl)} ${s.number}`, href: secPath },
          ],
          paragraphs: [`${chapterLabel(secUrl)} ${ch.number} — ${ch.title}`, `${sectionLabel(secUrl)} ${s.number}. ${s.text}`],
          navLinks: [],
        });
        await emitHtml(join(DIST, secPath, "index.html"), head2, body2, augmentedShell);
        sitemapEntries.push({ loc: secUrl, priority: 0.5, alternates: secAlts });
      }
    }
  }

  // -------- sitemap.xml --------
  const today = new Date().toISOString().slice(0, 10);
  const xmlEntries = sitemapEntries
    .map((e) => {
      const altLinks = (e.alternates || [])
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeAttr(a.hreflang)}" href="${escapeAttr(a.href)}" />`
        )
        .join("\n");
      return `  <url>
    <loc>${escapeAttr(e.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>${altLinks ? "\n" + altLinks : ""}
  </url>`;
    })
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries}
</urlset>
`;
  await writeFile(join(DIST, "sitemap.xml"), sitemap, "utf8");

  // robots.txt — keep simple, point at sitemap
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
  await writeFile(join(DIST, "robots.txt"), robots, "utf8");

  console.log(`Prerendered ${sitemapEntries.length} URLs.`);
  console.log(`Sitemap: dist/sitemap.xml`);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
