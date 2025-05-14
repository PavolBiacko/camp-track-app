import { UserRoles } from "@/types/enums/roles";

export type ColorScheme = "light" | "dark";

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

export type CurrentTime = {
  hours: number;
  minutes: number;
}

export type AppProviderProps = {
  leaderId: string;
}

export type ScreenConfigs = {
  name: string;
  title: string;
}

export type PickerItem = {
  id: string | null;
  showedText: string;
  helperText?: string;
};

export type PickerItemWithoutNull = {
  id: string;
  showedText: string;
  helperText?: string;
}
