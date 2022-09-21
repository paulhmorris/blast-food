import { Link } from "@remix-run/react";

export default function AdminIndex() {
  return (
    <div>
      <Link to="items">Edit Items</Link>
    </div>
  );
}
