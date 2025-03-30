export const formatDate = (date: Date): string => {
  const days = ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'];
  const day = days[date.getDay()];
  const formatted = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${day}`;
  return formatted;
}

export const formatDateToISO = (date: Date): string => {
  return date.toISOString().split('T')[0];
}