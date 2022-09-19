import type { ChangeEvent, ComponentPropsWithoutRef } from "react";
import { useState } from "react";

export const Input = ({
  name,
  type = "text",
  ...props
}: ComponentPropsWithoutRef<"input">) => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <input
      {...props}
      className={`block w-full rounded border-gray-300 font-medium shadow-sm transition focus:border-slate-700 focus:ring-slate-700 ${props.className}`}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};
