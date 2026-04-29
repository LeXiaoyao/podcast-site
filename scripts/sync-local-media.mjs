import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (process.env.GITHUB_ACTIONS === "true") {
  console.log("GitHub Actions detected; skipping local media sync and using committed public/site-media files.");
  process.exit(0);
}


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const contentDir = path.join(projectRoot, "src", "content", "episodes");
const outputRoot = path.join(projectRoot, "public", "site-media");

function listEpisodeFiles(dir) {
  const files = [];
  const queue = [dir];

  while (queue.length > 0) {
    const current = queue.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(fullPath);
        continue;
      }
      if (entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))) {
        files.push(fullPath);
      }
    }
  }

  return files.sort();
}

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if (!value || value === "null") {
    return null;
  }
  if (value.startsWith("\"")) {
    return JSON.parse(value);
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  return value;
}

function parseFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);

  if (lines[0]?.trim() !== "---") {
    return {};
  }

  const fields = {};
  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === "---") {
      break;
    }
    if (!line || line.startsWith(" ") || line.startsWith("\t") || line.trimStart().startsWith("- ")) {
      continue;
    }
    const colonIndex = line.indexOf(":");
    if (colonIndex <= 0) {
      continue;
    }
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1);
    fields[key] = parseScalar(rawValue);
  }

  return fields;
}

function ensureCleanOutput(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyAsset(targetPath, sourcePath) {
  const targetDir = path.dirname(targetPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.rmSync(targetPath, { force: true });
  fs.copyFileSync(sourcePath, targetPath);
}

function syncMedia() {
  ensureCleanOutput(outputRoot);

  let copiedCount = 0;
  for (const filePath of listEpisodeFiles(contentDir)) {
    const fields = parseFrontmatter(filePath);
    const episodeId = fields.episodeId;
    if (!episodeId) {
      continue;
    }

    const assetSpecs = [
      { key: "localAudioPath", outputName: "audio" },
      { key: "localCoverPath", outputName: "cover" },
    ];

    for (const asset of assetSpecs) {
      const sourcePath = fields[asset.key];
      if (!sourcePath || !fs.existsSync(sourcePath)) {
        continue;
      }

      const extension = path.extname(sourcePath).toLowerCase();
      if (!extension) {
        continue;
      }

      const targetPath = path.join(outputRoot, episodeId, `${asset.outputName}${extension}`);
      copyAsset(targetPath, sourcePath);
      copiedCount += 1;
    }
  }

  console.log(`copied ${copiedCount} local media files into public/site-media`);
}

syncMedia();
