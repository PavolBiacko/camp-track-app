import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors";
import { ColorStyle } from "@/components/ui/gluestack-ui-provider/types";
import { ColorScheme } from "@/types/base";
import { ButtonActionType, ButtonVariantType } from "@/types/custom/button";
import { UserRoles } from "@/types/enums/roles";
import { ActivityStatus } from "@/types/enums/schedule";
import { TabScreenOptions } from "@/types/tabs";
import { Platform } from "react-native";
import { ClassNameValue } from "tailwind-merge";

export const getTabScreenOptions = (colorScheme?: ColorScheme): TabScreenOptions => {
  return {
    tabBarShowLabel: false,
    tabBarActiveTintColor: getRGBColor("primary", "500", colorScheme),
    tabBarInactiveTintColor: getRGBColor("typography", "800", colorScheme),
    tabBarActiveBackgroundColor: getRGBColor("background", "900", colorScheme),
    tabBarInactiveBackgroundColor: getRGBColor("background", "100", colorScheme),
    tabBarStyle: {
      borderColor: getRGBColor("outline", "600", colorScheme),
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
  let text = "";
  let color: ColorStyle = "background";

  switch (role) {
    case UserRoles.CAMP_LEADER:
      text = "Vedúci tábora";
      color = "primary";
      break;
    case UserRoles.GROUP_LEADER:
      text = "Odd. vedúci";
      color = "secondary";
      break;
    case UserRoles.PARENT:
      text = "Rodič";
      color = "tertiary";
      break;
    case UserRoles.USER:
      text = "Hosť";
      color = "quaternary";
      break;
  }

  const styles = `bg-${color}-300 border border-${color}-700`
  return { text, styles };
}

export const getActivityStyles = (status: ActivityStatus, isCustom: boolean): ClassNameValue => {
  let bgColor: ColorStyle = "background";
  let borderColor: ColorStyle = isCustom ? "quaternary" : "outline";

  let additionalContainterStyles: ClassNameValue = "";

  switch (status) {
    case ActivityStatus.PAST:
      additionalContainterStyles = "opacity-30";
      break;
    case ActivityStatus.ACTIVE:
      bgColor = "secondary";
      borderColor = "secondary";
      additionalContainterStyles = "h-24";
      break;
    case ActivityStatus.FUTURE:
      break;
  }

  return `bg-${bgColor}-300 border-2 border-${borderColor}-500 ${additionalContainterStyles}`;
}
