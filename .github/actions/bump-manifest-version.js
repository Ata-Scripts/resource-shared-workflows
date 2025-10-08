const fs = require("fs");

// Read manifest
const manifestFile = fs.readFileSync("fxmanifest.lua", "utf8");

// Extract version string like 1.0.0
const versionMatch = manifestFile.match(/version\s+['"](\d+)\.(\d+)\.(\d+)['"]/);

if (!versionMatch) {
  throw new Error("No version found in fxmanifest.lua");
}

let [_, major, minor, patch] = versionMatch.map(Number);

// Increment logic
patch++;
if (patch > 9) {
  patch = 0;
  minor++;
  if (minor > 9) {
    minor = 0;
    major++;
  }
}

const newVersion = `${major}.${minor}.${patch}`;

// Replace in file
const newFileContent = manifestFile.replace(
  /version\s+['"].*['"]/,
  `version '${newVersion}'`
);

// Write updated manifest
fs.writeFileSync("fxmanifest.lua", newFileContent, "utf8");

console.log(`Version bumped to ${newVersion}`);
