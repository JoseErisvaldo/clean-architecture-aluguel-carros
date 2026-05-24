export const formatDateHour = (date?: string) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";
  console.log(d.toLocaleDateString("pt-BR"));
  return d.toLocaleString("pt-BR");
};
