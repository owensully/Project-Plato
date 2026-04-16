import { Platform } from 'react-native';

import { lightGreys, darkGreys, tintColour } from './palette';
import { Background } from '@react-navigation/elements';

export const Colours = {
  light: {
    text: lightGreys.black,
    background: lightGreys.grey3,
    tint: tintColour,
    icon: lightGreys.grey0,
    toolbar: lightGreys.grey2,
    tabIconDefault: lightGreys.grey0,
    tabIconSelected: lightGreys.grey0,
  },
  dark: {
    text: darkGreys.white,
    background: darkGreys.grey0,
    tint: tintColour,
    icon: darkGreys.grey3,
    toolbar: darkGreys.grey1,
    tabIconDefault: darkGreys.grey3,
    tabIconSelected: darkGreys.grey3,
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
