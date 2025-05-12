import { getRGBColor } from "@/components/ui/gluestack-ui-provider/colors";
import { ColorStyle } from "@/components/ui/gluestack-ui-provider/types";
import { ColorScheme } from "@/types/base";
import { ButtonActionType, ButtonVariantType } from "@/types/custom/button";
import { TransactionType } from "@/types/enums/finance";
import { Gender } from "@/types/enums/gender";
import { UserRoles } from "@/types/enums/roles";
import { ActivityStatus } from "@/types/enums/schedule";
import { ChildName } from "@/types/models/children";
import { StackScreenOptions, TabScreenOptions } from "@/types/options";
import { AlertButton, KeyboardTypeOptions, Platform } from "react-native";
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
      backgroundColor: getRGBColor("background", "50", colorScheme),
    },
  };
}

export const getStackScreenOptions = (colorScheme?: ColorScheme): StackScreenOptions => {
  return {
    animation: 'ios_from_right',
    headerShown: false,
    headerStyle: { backgroundColor: getRGBColor("background", "0", colorScheme) },
    headerTitleAlign: 'center',
    headerTitleStyle: { color: getRGBColor("typography", "950", colorScheme) },
    headerTintColor: getRGBColor("typography", "950", colorScheme),
    contentStyle: { backgroundColor: getRGBColor("background", "50", colorScheme) }
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

export const getRoleBadgeStylesAndText = (role: UserRoles) => {
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
    default:
      throw new Error(`Unknown role: ${role}`);
  }

  const styles = `bg-${color}-300 border border-${color}-700`
  return { text, styles };
}

export const getChildBadgeStylesAndText = (gender: Gender) => {
  let text = "";
  let color: ColorStyle = "background";

  switch (gender) {
    case Gender.MALE:
      text = "Chlapec";
      color = "secondary";
      break;
    case Gender.FEMALE:
      text = "Dievča";
      color = "quaternary";
      break;
    default:
      throw new Error(`Unknown gender: ${gender}`);
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
      additionalContainterStyles = "h-24";
      break;
    case ActivityStatus.FUTURE:
      break;
    default:
      throw new Error(`Unknown activity status: ${status}`);
  }

  return `bg-${bgColor}-300 border-2 border-${borderColor}-500 ${additionalContainterStyles}`;
}

export const getBadgeStylesAndTextForTransaction = (type: TransactionType) => {
  let text = "";
  let color: ColorStyle = "background";

  switch (type) {
    case TransactionType.DEPOSIT:
      text = "Vklad";
      color = "secondary";
      break;
    case TransactionType.WITHDRAWAL:
      text = "Vrátenie";
      color = "quaternary";
      break;
    case TransactionType.PURCHASE:
      text = "Bufet";
      color = "primary";
      break;
    case TransactionType.PAYOUT:
      text = "Vyplatenie";
      color = "error";
      break;
    case TransactionType.PAYBACK:
      text = "výdavok";
      color = "success";
      break;
    default:
      throw new Error(`Unknown transaction type: ${type}`);
  }

  const styles = `bg-${color}-300 border border-${color}-700`
  return { text, styles };
}

export const getTransactionColorStyle = (child: ChildName | null, amount: number) => {
  let borderStyles = "border-outline-500";
  let textStyles = "text-outline-500";

  if (amount < 0) {
    borderStyles = "border-error-400";
    textStyles = "text-error-400";
  } else if (amount > 0) {
    borderStyles = "border-success-500";
    textStyles = "text-success-500";
  }

  if (!child) {
    borderStyles = "border-primary-500";
  }

  return { borderStyles, textStyles }
}

export const getProperTextSizeForChildName = (text: string | undefined, offSet: number = 0): ClassNameValue => {
  if (!text) {
    return "";
  }

  if (text.length <= 7 - offSet) {
    return "text-6xl";
  } else if (text.length <= 11 - offSet) {
    return "text-5xl";
  } else if (text.length <= 15 - offSet) {
    return "text-4xl";
  } else if (text.length <= 19 - offSet) {
    return "text-3xl";
  } else if (text.length <= 24 - offSet) {
    return "text-2xl";
  } else {
    return "text-xl";
  }
}

export const getKeyboardType = (formDataTypeKey: string): KeyboardTypeOptions => {
  const formDataTypeLowercase = formDataTypeKey.toLowerCase();
  if (formDataTypeLowercase.includes("email")) {
    return "email-address";
  } else if (
    formDataTypeLowercase.includes("amount") ||
    formDataTypeLowercase.includes("phone") ||
    formDataTypeLowercase.includes("number")) {
    return "number-pad";
  }
  return "default";
}

export const getTrasactionAlertButtons = (
  transactionType: TransactionType,
  newBalance: number,
  handleConfirmPaybackAlert: () => void
): AlertButton[] => {
  const isPayoutWithBalance = transactionType === TransactionType.PAYOUT && newBalance !== 0;

  return [
    {
      text: isPayoutWithBalance ? "Výdavok" : "OK",
      onPress: isPayoutWithBalance ? handleConfirmPaybackAlert : undefined,
    },
  ];
};

export const getFormFieldHeightBasedOnLines = (numberOfLines?: number, offset: number = 0): number => {
  if (!numberOfLines) {
    return 16 + offset;
  }

  switch (numberOfLines) {
    case 1:
      return 16 + offset;
    case 2:
      return 24 + offset;
    case 3:
      return 32 + offset;
    default:
      return 40 + offset;
  }
}