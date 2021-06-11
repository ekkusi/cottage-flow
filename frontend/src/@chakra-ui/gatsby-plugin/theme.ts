import { extendTheme, Theme } from "@chakra-ui/react";

const fonts = ` 

      /* latin */
      @font-face {
        font-family: 'Disket Mono';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('fonts/Disket-Mono-Bold.ttf') format('truetype');
      }
      /* latin */
      @font-face {
        font-family: 'Disket Mono';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('fonts/Disket-Mono-Regular.ttf') format('truetype');
      }
      
`;

const theme: Theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    heading: "Disket Mono, Arial",
    body: "Disket Mono, Arial",
  },
  styles: {
    global: ({ theme }) => ({
      h1: {
        textTransform: "uppercase",
      },
    }),
  },
});

export default theme;
