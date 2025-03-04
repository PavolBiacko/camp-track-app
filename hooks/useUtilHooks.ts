export function useCapitalizeWord(text: string | undefined): string | undefined {
  if (!text) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};
