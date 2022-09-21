import { Link } from "@remix-run/react";
import { Title } from "~/components/Title";

export default function Index() {
  return (
    // Wrapper
    <div className="flex h-full flex-col items-center">
      <div className="my-12">
        <Title />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link
          to="/orders/open"
          className="inline-flex w-full items-center justify-center rounded border border-transparent bg-slate-600 px-5 py-10 text-base font-medium text-white no-underline focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 enabled:hover:bg-slate-700 disabled:opacity-50"
        >
          Kitchen
        </Link>
        <Link
          to="/orders/new"
          className="inline-flex items-center justify-center rounded border border-transparent bg-emerald-600 px-5 py-10 text-base font-medium text-white no-underline focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 enabled:hover:bg-slate-700 disabled:opacity-50"
        >
          POS
        </Link>
        <Link
          to="/admin"
          className="inline-flex items-center justify-center rounded border border-transparent border-slate-800 bg-white px-5 py-10 text-base font-medium text-slate-800 no-underline focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 enabled:hover:bg-slate-100 disabled:opacity-50"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
