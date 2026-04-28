import fs from "node:fs";
import path from "node:path";

const BASE = "/podcast-site";
const DIST = "dist";

const exts = new Set([".html", ".xml", ".txt", ".json", ".js", ".css"]);

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;

  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      out.push(...walk(full));
    } else if (exts.has(path.extname(full))) {
      out.push(full);
    }
  }

  return out;
}

const replacements = [
  ['href="/episodes/', `href="${BASE}/episodes/`],
  ['href="/categories/', `href="${BASE}/categories/`],
  ['href="/search/', `href="${BASE}/search/`],
  ['href="/subscribe/', `href="${BASE}/subscribe/`],
  ['href="/about/', `href="${BASE}/about/`],
  ['href="/rss.xml"', `href="${BASE}/rss.xml"`],

  ['src="/site-media/', `src="${BASE}/site-media/`],
  ['src="/cover-placeholder.svg"', `src="${BASE}/cover-placeholder.svg"`],
  ['poster="/site-media/', `poster="${BASE}/site-media/`],
  ['content="/site-media/', `content="${BASE}/site-media/`],

  ['url(/site-media/', `url(${BASE}/site-media/`],
];

let changed = 0;

for (const file of walk(DIST)) {
  let text = fs.readFileSync(file, "utf8");
  const old = text;

  for (const [from, to] of replacements) {
    text = text.split(from).join(to);
  }

  // 防止重复加前缀
  while (text.includes(`${BASE}${BASE}`)) {
    text = text.replaceAll(`${BASE}${BASE}`, BASE);
  }

  if (text !== old) {
    fs.writeFileSync(file, text);
    changed += 1;
    console.log("fixed:", file);
  }
}

console.log(`GitHub Pages base fix complete. Changed ${changed} files.`);
