
import fs from "node:fs";

export function createEntry(text: Object) {
  const date = new Date();
  const fileName = date.toISOString().replace(/:/g, "-") + "-" + Math.random().toString(36).substr(2, 9);
  const filePath = `./entries/${fileName}.json`;
  const data = JSON.stringify(text);
  fs.writeFileSync(filePath, data);
  return { fileName, filePath };
}

export function readEntry(fileName: string) {
  const filePath = `./entries/${fileName}.json`;
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export function getAllEntries() {
  const files = fs.readdirSync("./entries");
  return files.map((file) => {
    return readEntry(file);
  });
}