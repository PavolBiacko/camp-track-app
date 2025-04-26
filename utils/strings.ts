import { ClassNameValue } from "tailwind-merge";

export const capitalizeWord = (text: string | undefined): string | undefined => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getProperTextSizeForChildName = (text: string | undefined): ClassNameValue => {
  if (!text) {
    return "";
  }

  if (text.length <= 8) {
    return "text-6xl";
  } else if (text.length <= 12) {
    return "text-5xl";
  } else if (text.length <= 15) {
    return "text-4xl";
  } else if (text.length <= 19) {
    return "text-3xl";
  } else if (text.length <= 24) {
    return "text-2xl";
  } else {
    return "text-xl";
  }
}

export const getLongerString = (str1: string, str2: string): string => {
  return str1.length > str2.length ? str1 : str2;
}