import { UserRoles } from "./enums/roles";

export type ColorScheme = "light" | "dark";

export type ColorStyles = "primary" | "secondary" | "tertiary" | "quaternary" | "success" | "error" | "background" | "default";

export type ColorSchemeProps = {
  colorScheme?: ColorScheme;
  setColorScheme?: (colorScheme: ColorScheme) => void;
}

export type BaseLayoutProps = {
  containerStyles?: string,
}

export type UserRolesProps = {
  role: UserRoles
}
