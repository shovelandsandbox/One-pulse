import defaultTheme from "./default/DefaultTheme";
import ThemeSizes from "./default/DefaultThemeSizes";
import ThemeColors from "./default/DefaultThemeColors";
import Theme from "./default";
const Sizes = ThemeSizes;
const Colors = ThemeColors;
// This const will define what styles all the screens, components and containers should be using
const activeTheme = defaultTheme;

export { activeTheme, Sizes, Colors, Theme };
