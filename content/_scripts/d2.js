const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const vaultRoot = path.resolve(__dirname, "..");

function extractD2Blocks(content) {
  const matches = [...content.matchAll(/```d2\s+([\s\S]*?)```/g)];
  return matches.map((m, i) => ({ code: m[1], index: i }));
}

function render(code, outPath) {
  const tempFile = outPath.replace(/\.png$/, ".d2");
  fs.writeFileSync(tempFile, code);
  execSync(`d2 "${tempFile}" "${outPath}"`);
  fs.rmSync(tempFile, { force: true });
}

function processFile(filePath) {
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  const content = fs.readFileSync(filePath, "utf-8");
  const exportDir = path.join(path.dirname(filePath), "assets");

  if (ext === ".md") {
    const blocks = extractD2Blocks(content);
    if (blocks.length === 0) {
      console.log(`No D2 blocks found in ${filePath}`);
      return;
    }
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });
    blocks.forEach(({ code, index }) => {
      const out = path.join(exportDir, `${name}_${index}.png`);
      render(code, out);
    });
  }
}

// CLI usage: node d2.js <filePath>
const inputPath = process.argv[2];
if (!inputPath) {
  console.error("❌ Please provide a file path to process.");
  process.exit(1);
}

const resolvedPath = path.resolve(vaultRoot, inputPath);
if (!fs.existsSync(resolvedPath)) {
  console.error(`❌ File not found: ${resolvedPath}`);
  process.exit(1);
}

processFile(resolvedPath);
console.log(`✅ D2 export complete for: ${inputPath}`);
