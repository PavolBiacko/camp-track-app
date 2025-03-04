export function useCapitalizeWord(text: string | undefined): string {
  if (!text) {
    return "NO TEXT";  // TODO
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};
