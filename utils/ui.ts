import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors";
import { ColorScheme } from "@/types/base";
import { ButtonActionType, ButtonVariantType } from "@/types/custom/button";
import { UserRoles } from "@/types/enums/roles";
import { TabScreenOptions } from "@/types/tabs";
import { Platform } from "react-native";
import { ClassNameValue } from "tailwind-merge";

export const getTabScreenOptions = (colorScheme?: ColorScheme): TabScreenOptions => {
  return {
    tabBarShowLabel: false,
    tabBarActiveTintColor: getRGBColor("primary", "500", colorScheme),
    tabBarInactiveTintColor: getRGBColor("typography", "950", colorScheme),
    tabBarActiveBackgroundColor: getRGBColor("background", "300", colorScheme),
    tabBarInactiveBackgroundColor: getRGBColor("background", "100", colorScheme),
    tabBarStyle: {
      borderColor: getRGBColor("background", "300", colorScheme),
      borderTopWidth: 2,
      height: Platform.OS === "ios" ? 75 : 60,
    },
    sceneStyle: {
      backgroundColor: getRGBColor("background", "0", colorScheme),
    },
  };
}

export const getButtonStyles = (action: ButtonActionType = "primary", variant: ButtonVariantType = "combined"): ClassNameValue => {
  if (action === "default") {
    return "";
  }
  switch (variant) {
    case "solid":
      return `bg-${action}-300`;
    case "outline":
      return `border-2 border-${action}-300`;
    case "combined":
      return `bg-${action}-300 border-2 border-${action}-700`;
    case "ghost":
      return "";
  }
}

export const getBadgeStylesAndText = (role: UserRoles) => {
  // Define the styles and text based on the role
  let text = "";
  let styles = "";

  switch (role) {
    case UserRoles.CAMP_LEADER:
      text = "Vedúci tábora";
      styles = "bg-primary-300 border border-primary-700";
      break;
    case UserRoles.GROUP_LEADER:
      text = "Odd. vedúci";
      styles = "bg-secondary-300 border border-secondary-700";
      break;
    case UserRoles.PARENT:
      text = "Rodič";
      styles = "bg-tertiary-300 border border-tertiary-700";
      break;
    case UserRoles.USER:
      text = "Hosť";
      styles = "bg-quaternary-300 border border-quaternary-700";
      break;
  }

  return { text, styles };
}
