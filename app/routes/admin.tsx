import { Link, Outlet } from "@remix-run/react";

export default function AdminLayout() {
  return (
    <>
      <header className="mb-8 flex justify-center bg-slate-600 py-4 px-6 text-center">
        <Link
          to="/"
          className="mr-auto flex items-center text-2xl no-underline"
        >
          🚀
        </Link>
        <Link
          to="/admin"
          className="mr-auto text-white no-underline hover:text-white"
        >
          <h1>Admin Panel</h1>
        </Link>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
}
