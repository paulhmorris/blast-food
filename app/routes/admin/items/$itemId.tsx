import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { updateItem } from "~/models/items.server";
import { Item } from "~/types";

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`${process.env.API_URL}/items/${params.itemId}`);
  const item = await res.json();
  return json(item);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const name = formData.get("name");
  const price = formData.get("price");

  if (typeof id !== "string" || id.length === 0) {
    return json(
      { errors: { id: "Item id is required", name: null, price: null } },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { id: null, name: "Item name is required", price: null } },
      { status: 400 }
    );
  }

  if (typeof price !== "string" || price.length === 0) {
    return json(
      { errors: { id: null, name: null, price: "Price is required" } },
      { status: 400 }
    );
  }

  const updatedItem = await updateItem({ id, name, price });
  return redirect("/admin/items");
};

export default function Item() {
  const item = useLoaderData<Item>();
  return (
    <>
      <Link to="/admin/items" className="mb-2 flex items-center no-underline">
        <IoChevronBack className="h-4 w-4" />
        <span>Back</span>
      </Link>
      <form method="post" className="max-w-xs space-y-4">
        <input type="hidden" name="id" value={item.id} />
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <Input id="name" name="name" initialValue={item.name} required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <Input
            id="price"
            name="price"
            initialValue={item.price.toString()}
            required
          />
        </div>
        <Button>Save</Button>
      </form>
    </>
  );
}
