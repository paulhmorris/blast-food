import type { Item } from "~/types";
const url = process.env.API_URL;

export const getItems = async () => {
  const res = await fetch(`${url}/items`);
  const data: Item[] = await res.json();
  return data;
};
