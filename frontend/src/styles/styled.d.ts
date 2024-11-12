import 'styled-components';

declare module 'style-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secundary: string;
      background: string;
      text: string;
      textAlt: string;
      textbackground: string;
      textHover: string;
      optionSelectedBg: string;
      optionSelectedColor: string;
      paginationArrow: string;
      paginationArrowHover: string;
    };
  }
}