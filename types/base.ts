export type ColorScheme = "light" | "dark";

export type ColorSchemeProps = {
  colorScheme?: ColorScheme;
  setColorScheme?: (colorScheme: ColorScheme) => void;
}

export type BaseLayoutProps = {
  containerStyles?: string,
}

export type LoadingProps = {
  showText: boolean,
  containerStyles?: string,
}
