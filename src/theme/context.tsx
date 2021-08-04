/** @jsxRuntime classic */
/** @jsx jsx */
import { createContext, useState, useContext } from 'react';
import {
  jsx,
  ThemeProvider as EmotionThemeProvider,
  useTheme as useEmotionTheme,
} from '@emotion/react';

import themeConfig from './config';
import { ThemeVariant } from './types';

interface IThemeContext {
  themeVariant: string;
  setThemeVariant: React.Dispatch<React.SetStateAction<ThemeVariant>>;
}

const ThemeContext = createContext<IThemeContext>({
  themeVariant: ThemeVariant.Light,
  setThemeVariant: () => {},
});

interface IProps {
  children: JSX.Element;
}

export const ThemeProvider = ({ children }: IProps) => {
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(
    ThemeVariant.Light,
  );
  return (
    <EmotionThemeProvider theme={themeConfig[themeVariant]}>
      <ThemeContext.Provider
        value={{ themeVariant, setThemeVariant }}
      >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
};

export const useTheme = () => {
  const theme = useEmotionTheme();
  const contextValue = useContext(ThemeContext);
  return { theme, ...contextValue };
};
