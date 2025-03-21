export type ModeType = 'light' | 'dark' | 'system';

export type ColorShade = '0' | '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';

type ColorCategory = {
  [key in ColorShade]: string;
};

export interface SpecialCategory {
  backgroundError: string;
  backgroundWarning: string;
  backgroundSuccess: string;
  backgroundMuted: string;
  backgroundInfo: string;
  indicatorPrimary: string;
  indicatorInfo: string;
  indicatorError: string;
}

export interface ThemeColors {
  primary: ColorCategory;
  secondary: ColorCategory;
  tertiary: ColorCategory;
  error: ColorCategory;
  success: ColorCategory;
  warning: ColorCategory;
  info: ColorCategory;
  typography: ColorCategory;
  outline: ColorCategory;
  background: ColorCategory;
  special: SpecialCategory;
}

export interface Colors {
  light: ThemeColors;
  dark: ThemeColors;
}