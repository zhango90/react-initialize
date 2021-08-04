import { ThemeVariant } from './types';

const themeConfig = [ThemeVariant.Light, ThemeVariant.Dark].map(
  (variant) => ({
    colors: {
      primary: variant === ThemeVariant.Light ? '#eee' : 'blue',
      secondary: variant === ThemeVariant.Light ? '#eee' : 'blue',
    },
  }),
);

export default {
  [ThemeVariant.Light]: themeConfig[0],
  [ThemeVariant.Dark]: themeConfig[1],
};
