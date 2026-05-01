import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  afenin: {
    50: '#e8f4ff',
    100: '#c6ddff',
    200: '#9fc5ff',
    300: '#77adff',
    400: '#4f94ff',
    500: '#2d7ae6',
    600: '#1f5ead',
    700: '#144375',
    800: '#0a293f',
    900: '#041321',
  },
  accent: {
    500: '#f59f00',
    600: '#dd8600',
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: '"Space Grotesk", "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  styles: {
    global: {
      body: {
        bgGradient: 'linear(to-br, #030712, #041321, #0a293f)',
        color: 'gray.100',
      },
    },
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          bg: 'whiteAlpha.80',
          backdropFilter: 'blur(12px)',
          border: '1px solid',
          borderColor: 'whiteAlpha.300',
        },
      },
    },
  },
});
