export default function formatDate(inputDate: string) {
  const d = new Date(inputDate);

  let date: number | string = d.getDate();
  let month: number | string = d.getMonth() + 1;
  const year = d.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}.${month}.${year}`;
}
