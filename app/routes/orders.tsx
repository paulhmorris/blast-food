import { Link, Outlet } from "@remix-run/react";

export default function OrdersPage() {
  return (
    <main className="flex-auto">
      <header>
        <Link to="/">
          <h1 className="text-base underline decoration-rose-800 decoration-2 underline-offset-4">
            Blast Food 🚀
          </h1>
        </Link>
      </header>
      <Outlet />
    </main>
  );
}
