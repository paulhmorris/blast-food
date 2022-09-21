import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { getItems } from "~/models/items.server";
import { completeOrder, getOpenOrders } from "~/models/orders.server";
import type { Item, OrderWithGuestsAndOrderItems } from "~/types";

type LoaderData = {
  orders: OrderWithGuestsAndOrderItems;
  items: Item[];
};

export async function loader() {
  const orders = await getOpenOrders();
  const items = await getItems();
  return json<LoaderData>({ orders, items });
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const orderId = formData.get("orderId");

  if (typeof orderId !== "string" || orderId.length === 0) {
    return json(
      { errors: { orderId: "Order id is required" } },
      { status: 400 }
    );
  }

  const order = await completeOrder(orderId);
  return json(order);
};

export default function Orders() {
  const items = useLoaderData<LoaderData>().items;
  const orders = useLoaderData<LoaderData>().orders;

  return (
    <main className="max-w-3xl pb-12">
      <h1 className="mt-12 mb-6 text-rose-800">Open Orders</h1>
      <div className="flex px-4 font-bold text-slate-700">
        <p className="w-1/6">Guest Name</p>
        <p className="w-1/6">Order Created</p>
        <p>Items</p>
        <p className="ml-auto"></p>
      </div>
      <ul className="flex flex-col gap-2">
        {orders
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          .map((order) => (
            <li
              key={order.id}
              className="flex overflow-ellipsis whitespace-nowrap rounded-sm border-2 border-slate-500 bg-slate-100 p-4 text-left"
            >
              <p className="w-1/6">{order.guest.name}</p>
              <p className="w-1/6">
                {order.createdAt &&
                  new Intl.DateTimeFormat("en-US").format(
                    new Date(order.createdAt)
                  )}
              </p>
              <ul>
                {order.orderItems.map((item) => {
                  const itemName = items.find(
                    (i) => i.id === item.itemId
                  )?.name;
                  return (
                    <li key={item.itemId} className="ml-4 list-disc">
                      {item.quantity}x {itemName ?? "No name"}
                    </li>
                  );
                })}
              </ul>
              <form method="post" className="my-auto ml-auto">
                <input type="hidden" value={order.id} name="orderId" />
                <Button>Mark Complete</Button>
              </form>
            </li>
          ))}
      </ul>
    </main>
  );
}
