import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { classNames, formatCurrency } from "~/lib/helpers";
import { getItems } from "~/models/items.server";
import { placeOrder } from "~/models/orders.server";
import type { Item, SelectedItem } from "~/types";

type LoaderData = Awaited<ReturnType<typeof getItems>>;

export async function loader() {
  const items = await getItems();
  return json<LoaderData>(items);
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const guestName = formData.get("guestName");
  const items = formData.get("items");

  if (typeof guestName !== "string" || guestName.length === 0) {
    return json(
      { errors: { guestName: "Guest name is required", items: null } },
      { status: 400 }
    );
  }

  if (typeof items !== "string" || items.length === 0) {
    return json(
      { errors: { guestName: null, items: "At least one item is required" } },
      { status: 400 }
    );
  }

  const order = await placeOrder({ guestName, items });
  return redirect(`/orders/${order.id}`);
};

export default function NewOrder() {
  const items = useLoaderData<LoaderData>();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>();

  const addItem = (item: Item) => {
    if (!selectedItems) {
      setSelectedItems([{ ...item, quantity: 1 }]);
      return;
    }

    const existingItem = selectedItems.find((i) => i.id === item.id);
    if (!existingItem) {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
      return;
    }

    const updatedItems = selectedItems.map((item) => {
      if (item.id === existingItem.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setSelectedItems(updatedItems);
  };

  return (
    <>
      <h1 className="my-12 text-rose-800">New Order</h1>
      <main className="flex">
        <div className="sticky top-6 flex-1 self-start pr-6">
          <Form method="post" className="mb-12">
            <input
              type="hidden"
              name="items"
              value={JSON.stringify(
                selectedItems?.map(({ id, price, quantity }) => ({
                  id,
                  price,
                  quantity,
                }))
              )}
            />

            <div className="flex flex-col">
              <label htmlFor="guestName">Guest Name</label>
              <Input
                name="guestName"
                id="guestName"
                className="mb-2"
                required
              />
              <Button className="w-full" type="submit">
                Complete Order
              </Button>
            </div>
          </Form>

          <label className="text-2xl font-bold">Selected Items</label>
          <ul className="flex flex-col gap-2">
            {selectedItems ? (
              selectedItems.map((item) => (
                <li
                  key={item.id}
                  className="relative flex justify-between rounded border-2 border-emerald-800 bg-emerald-50 py-3 pl-4 pr-12 font-medium text-emerald-800"
                >
                  <p>{item.name}</p>
                  <p className="ml-auto">
                    {formatCurrency(Number(item.price), 2)}
                  </p>
                  <p className="ml-6 text-right">Qty: {item.quantity}</p>
                </li>
              ))
            ) : (
              <p className="mt-4 text-center text-slate-400">Nothing yet!</p>
            )}
          </ul>
        </div>

        <div className="flex-[2_1_0%] pl-6">
          <label className="text-2xl font-bold">Available Items</label>
          <ul className="flex flex-wrap gap-4 overflow-y-scroll">
            {items
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((item) => {
                return (
                  <li
                    key={`item-${item.id}`}
                    className={classNames(
                      "flex basis-48 cursor-pointer select-none flex-col justify-between gap-2 rounded border-2 border-slate-800 bg-slate-50 px-2 py-4 font-medium text-slate-800"
                    )}
                    onClick={() => addItem(item)}
                  >
                    <p>{item.name}</p>
                    <p>{formatCurrency(Number(item.price), 2)}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </main>
    </>
  );
}
