const babel = require("babel-core");

function getBabelTransformCode(input, options) {
  const babelOptions = {
    plugins: [["../pru-country-babel-plugin/lib"]],
  };
  babelOptions.plugins[0].push(options);
  return babel.transformFileSync(input, babelOptions);
}

const output = getBabelTransformCode("../app/AppContainer.js", {
  country: "sg",
});
