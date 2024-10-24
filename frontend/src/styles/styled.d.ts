import 'styled-components';

declare module 'style-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      textAlt: string;
      textHover: string;
      optionSelectedBg: string;
      optionSelectedColor: string;
      paginationArrow: string;
      paginationArrowHover: string;
    };
  }
}