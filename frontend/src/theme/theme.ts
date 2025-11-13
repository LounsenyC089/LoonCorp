import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#e8f3ff',
    100: '#c2dcff',
    200: '#9bc4ff',
    300: '#74acff',
    400: '#4d95ff',
    500: '#337be6',
    600: '#265fb4',
    700: '#1a4483',
    800: '#0d2852',
    900: '#010d23',
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: '"Source Sans Pro", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Source Sans Pro", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.700',
      },
    },
  },
});
