import { useParams } from "@remix-run/react";

export default function Order() {
  const params = useParams();
  return <div>Order {params.orderId}</div>;
}
