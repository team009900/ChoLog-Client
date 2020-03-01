import { configureFonts, DefaultTheme, Colors } from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Spoqa Han Sans Regular, sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Spoqa Han Sans Regular, sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Spoqa Han Sans Regular, sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Spoqa Han Sans Regular, sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#79B38C',
    darkPrimary: '#418B5A',
    lightPrimary: '#EDF6ED',
    subPrimary: '#906E14',
    accent: '#EECF6F',
    error: '#EC5151',
    text: '#222222',
    subText: '#5D5D5D',
    onBackground: '#222222',
    onSurface: '#222222',
    background: '#FAFAFA',
    surface: '#ffffff',
    divider: Colors.grey400,
    subDivider: Colors.grey200,
  },
  fonts: configureFonts(fontConfig),
};

export default theme;
