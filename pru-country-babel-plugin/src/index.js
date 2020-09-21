import path from "path";
import fs from "fs";

export default function ({ types }) {
  return {
    visitor: {
      ImportDeclaration: (nodePath, state) => {
        if (nodePath.node.__processed) return;
        if (!state.opts.country) return;
        if (!isModuleInApp(state.file.opts.filename)) return;
        const country = state.opts.country;
        const importFileName = nodePath.node.source.value;
        if (!isRelativePath(importFileName) || isModuleInApp(importFileName))
          return;
        const currentProcessingFile = state.file.opts.filename;
        const dirName = path.dirname(currentProcessingFile);
        const newFileName = getCountrySpecificFile(
          country,
          importFileName,
          dirName
        );
        if (newFileName !== null) {
          const importDeclaration = types.importDeclaration(
            nodePath.node.specifiers,
            types.stringLiteral(newFileName)
          );
          importDeclaration.__processed = true;
          nodePath.replaceWithMultiple([importDeclaration]);
        }
      },
    },
  };
}

function isRelativePath(nodePath) {
  return nodePath.match(/^\.?\.\//);
}

function isNodeModule(nodePath) {
  return nodePath.indexOf("node_modules") > -1;
}

function isModuleInApp(nodePath) {
  return nodePath.indexOf("app") > -1 && !(nodePath.indexOf("APP") > -1);
}

function getCountrySpecificFile(country, filename, fileDir) {
  const currentDirectory = process.cwd();
  let countryFile = path.resolve(
    currentDirectory,
    country,
    path.relative(currentDirectory, fileDir),
    filename + ".js"
  );

  if (!fileExists(countryFile)) {
    countryFile = path.resolve(
      currentDirectory,
      country,
      path.relative(currentDirectory, fileDir),
      filename,
      "index.js"
    );
  }

  if (isNodeModule(countryFile)) {
    return null;
  }
  if (fileExists(countryFile)) {
    const fileRelativeLocation = path.relative(fileDir, countryFile);
    if (fileRelativeLocation.indexOf("/") == -1 && fileRelativeLocation.indexOf("\\") == -1) return null;

    //Transform file to remove .js at the end
    return fileRelativeLocation
      .split(".")
      .slice(0, -1)
      .join(".");
  }
  return null;
}

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}
