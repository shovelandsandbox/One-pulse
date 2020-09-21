"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var types = _ref.types;

  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(nodePath, state) {
        if (nodePath.node.__processed) return;
        if (!state.opts.country) return;
        if (!isModuleInApp(state.file.opts.filename)) return;
        var country = state.opts.country;
        var importFileName = nodePath.node.source.value;
        if (!isRelativePath(importFileName) || isModuleInApp(importFileName)) return;
        var currentProcessingFile = state.file.opts.filename;
        var dirName = _path2.default.dirname(currentProcessingFile);
        var newFileName = getCountrySpecificFile(country, importFileName, dirName);
        if (newFileName !== null) {
          var importDeclaration = types.importDeclaration(nodePath.node.specifiers, types.stringLiteral(newFileName));
          importDeclaration.__processed = true;
          nodePath.replaceWithMultiple([importDeclaration]);
        }
      }
    }
  };
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var currentDirectory = process.cwd();
  var countryFile = _path2.default.resolve(currentDirectory, country, _path2.default.relative(currentDirectory, fileDir), filename + ".js");

  if (!fileExists(countryFile)) {
    countryFile = _path2.default.resolve(currentDirectory, country, _path2.default.relative(currentDirectory, fileDir), filename, "index.js");
  }

  if (isNodeModule(countryFile)) {
    return null;
  }
  if (fileExists(countryFile)) {
    var fileRelativeLocation = _path2.default.relative(fileDir, countryFile);
    if (fileRelativeLocation.indexOf("/") == -1 && fileRelativeLocation.indexOf("\\") == -1) return null;
    //Transform file to remove .js at the end
    return fileRelativeLocation.split(".").slice(0, -1).join(".");
  }
  return null;
}

function fileExists(filePath) {
  try {
    return _fs2.default.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}