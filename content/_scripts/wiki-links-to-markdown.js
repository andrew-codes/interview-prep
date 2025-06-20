const fs = require("fs");
const path = require("path");

const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node wiki-links-to-markdown.js path/to/file.md");
  process.exit(1);
}
const filePath = path.resolve(inputFile);
processFile(filePath);

function encodeFileName(name) {
  return name.trim().replace(/ /g, "%20");
}
function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Match [[Link]] and [[Link|Text]], but not ![[Embed]]
  content = content.replace(
    /(?<!\!)\[\[([^\|\]]+?)(?:\|([^\]]+))?\]\]/g,
    (_, fileName, displayText) => {
      const encoded = encodeFileName(fileName);
      const text = displayText || fileName;
      return `[${text}](${encoded}.md)`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Updated:", filePath);
  }
}
