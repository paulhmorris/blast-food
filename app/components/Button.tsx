import type { ComponentPropsWithoutRef } from "react";

export const Button = (props: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded border border-transparent bg-slate-600 px-5 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 enabled:hover:bg-slate-700 disabled:opacity-50 ${
        props.className && props.className
      }`}
    >
      {props.children}
    </button>
  );
};
