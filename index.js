/** @format */
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import PulseAppContainer from "./app/PulseAppContainer";
// import React from "react";

console.disableYellowBox = true;

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

AppRegistry.registerComponent(appName, () => PulseAppContainer);
