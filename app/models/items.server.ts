import type { Item } from "~/types";
const url = process.env.API_URL;

export const getItems = async () => {
  const res = await fetch(`${url}/items`);
  const data: Item[] = await res.json();
  return data;
};

export const createItem = async (item: Pick<Item, "name" | "price">) => {
  const res = await fetch(`${url}/items/create`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item }),
  });
  const data = await res.json();
  return data;
};

export const updateItem = async ({ id, name, price }: Item) => {
  const res = await fetch(`${url}/items/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });
  const data = await res.json();
  return data;
};

export const deleteItem = async (itemId: string) => {
  const res = await fetch(`${url}/items/discontinue/${itemId}`, {
    method: "PATCH",
  });
  const data = await res.json();
  return data;
};
