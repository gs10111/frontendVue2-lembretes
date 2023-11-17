export function formatDate(date) {
  const realDate = date.split("T")[0];
  const splitedDate = realDate.split("-");
  const day = splitedDate[2];
  const month = splitedDate[1];
  const year = splitedDate[0];

  return `${day}/${month}/${year}`;
}
