import { fetch } from "@remix-run/node";
import type { Order, OrderWithGuestsAndOrderItems } from "~/types";
const url = process.env.API_URL;

export const getOrders = async () => {
  const res = await fetch(`${url}/orders`);
  const data: OrderWithGuestsAndOrderItems = await res.json();
  return data;
};

export const getOpenOrders = async () => {
  const res = await fetch(`${url}/orders/open`);
  const data: OrderWithGuestsAndOrderItems = await res.json();
  return data;
};

export const completeOrder = async (id: string) => {
  const res = await fetch(`${url}/orders/complete/${id}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data = await res.json();
  return data;
};

interface PlaceOrder {
  ({ guestName, items }: { guestName: string; items: string }): Promise<Order>;
}

export const placeOrder: PlaceOrder = async ({ guestName, items }) => {
  console.log(JSON.stringify({ guestName, items }));
  const res = await fetch(`${url}/orders/place`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ guestName, items }),
  });
  const data = await res.json();
  return data;
};
