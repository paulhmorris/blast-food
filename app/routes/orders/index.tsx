import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getOrders } from "~/models/orders.server";

type LoaderData = Awaited<ReturnType<typeof getOrders>>;

export async function loader() {
  const orders = await getOrders();
  return json<LoaderData>(orders);
}

export default function Orders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ul>
      {data.map((order) => (
        <li key={order.id}>{order.guest.name}</li>
      ))}
    </ul>
  );
}
