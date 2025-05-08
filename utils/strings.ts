export const capitalizeWord = (text: string | undefined): string | undefined => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getLongerString = (str1: string, str2: string): string => {
  return str1.length > str2.length ? str1 : str2;
}

export const getNumberOfLines = (text?: string): number => {
  const lines = text?.split('\n');
  return lines?.length || 0;
}