import { ActionFunction, json, redirect } from "@remix-run/node";
import { deleteItem } from "~/models/items.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const itemId = formData.get("itemId");
  if (typeof itemId !== "string" || itemId.length === 0) {
    return json(
      { errors: { name: "Item id is required", price: null } },
      { status: 400 }
    );
  }

  const deletedItem = await deleteItem(itemId);
  return redirect("/admin/items");
};
