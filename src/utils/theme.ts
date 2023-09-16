export interface DefaultColor {
  colors: {
    [key in ColorType]: string;
  };
}

export const theme: DefaultColor = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    gray: '#555555',
    grayLight: '#EEEEEE',
    primary: '#5c62d4',
    gradient1: '#555ABE',
    gradient2: '#9396de',
  },
};

export type ColorType =
  | 'white'
  | 'gradient1'
  | 'gradient2'
  | 'black'
  | 'gray'
  | 'grayLight'
  | 'transparent'
  | 'primary';
