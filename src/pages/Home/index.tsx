/** @jsxRuntime classic */
/* @jsx jsx */
import { css, jsx } from '@emotion/react/macro';
import { ThemeVariant, useTheme } from 'theme';

const homepageCss = (theme) => css`
  font-size: 1rem;
  line-height: 1;
  color: ${theme.colors.primary};
`;

export const Home = () => {
  const { setThemeVariant } = useTheme();
  return (
    <div css={homepageCss}>
      <h1>Home Page</h1>
      <button
        type="button"
        onClick={() => setThemeVariant?.(ThemeVariant.Dark)}
      >
        change Theme
      </button>
    </div>
  );
};
