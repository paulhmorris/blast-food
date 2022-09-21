import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { classNames, formatCurrency } from "~/lib/helpers";
import { createItem, getItems } from "~/models/items.server";

type LoaderData = Awaited<ReturnType<typeof getItems>>;
export async function loader() {
  const items = await getItems();
  if (items.length > 0) {
    return json<LoaderData>(items.sort((a, b) => (a.name < b.name ? -1 : 1)));
  }
  return json<LoaderData>(items);
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const price = formData.get("price");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { name: "Item name is required", price: null } },
      { status: 400 }
    );
  }

  if (typeof price !== "string" || price.length === 0) {
    return json(
      { errors: { name: null, price: "Price is required" } },
      { status: 400 }
    );
  }

  const item = await createItem({ name, price });
  return json(item);
};

export default function NewItem() {
  const items = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>New Item</h1>
      <form method="post" className="mb-12 max-w-xs space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <Input id="name" name="name" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <Input id="price" name="price" required />
        </div>
        <Button>Create Item</Button>
      </form>
      <div>
        <label className="text-2xl font-bold">Current Items</label>
        <ul className="flex flex-wrap gap-4 overflow-y-scroll">
          {items.length > 0 ? (
            items.map((item) => {
              return (
                <li
                  key={`item-${item.id}`}
                  className={classNames(
                    "relative flex basis-48 select-none flex-col justify-between gap-2 rounded border-2 border-slate-800 bg-slate-50 px-2 py-4 font-medium text-slate-800"
                  )}
                >
                  <section className="mb-4">
                    <p>{item.name}</p>
                    <p>{formatCurrency(Number(item.price), 2)}</p>
                  </section>
                  <div className="flex justify-between">
                    <Link
                      to={`/admin/items/${item.id}`}
                      className="rounded bg-emerald-50 px-2 py-1 text-emerald-800 no-underline ring-1 ring-emerald-800 hover:bg-emerald-100"
                    >
                      Edit
                    </Link>
                    <form action="/admin/items/delete" method="post">
                      <input type="hidden" name="itemId" value={item.id} />
                      <button className="rounded bg-red-50 px-2 py-1 text-red-800 ring-1 ring-red-800 hover:bg-red-100">
                        Delete
                      </button>
                    </form>
                  </div>
                </li>
              );
            })
          ) : (
            <p className="text-slate-500">No items added yet!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
