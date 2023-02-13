interface ISortBy<T> {
  list: Array<T>;
  prop: string;
  order: "asc" | "desc";
}

export default function <T>(data: ISortBy<T>): Array<T> {
  const { prop, order } = data;
  let { list } = data;

  list = JSON.parse(JSON.stringify(list));

  const orderType = order === "asc" ? 1 : -1;

  // eslint-disable-next-line
  list.sort((a: any, b: any) => {
    if (a?.[prop] > b?.[prop]) return orderType;
    else if (a?.[prop] < b?.[prop]) return -orderType;
    else return 0;
  });
  return list;
}
