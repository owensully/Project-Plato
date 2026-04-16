import { Platform } from 'react-native';

import { lightGreys } from './palette';
import { darkGreys } from './palette';
import { tintColour } from './palette';

export const Colours = {
  light: {
    text: lightGreys.black,
    background: lightGreys.white,
    tint: tintColour,
    icon: lightGreys.grey0,
    tabIconDefault: lightGreys.grey0,
    tabIconSelected: tintColour,
  },
  dark: {
    text: darkGreys.white,
    background: darkGreys.black,
    tint: tintColour,
    icon: darkGreys.grey3,
    tabIconDefault: darkGreys.grey3,
    tabIconSelected: tintColour,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
