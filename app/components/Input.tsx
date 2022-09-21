import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from "react";

export const Input = ({
  name,
  type = "text",
  initialValue,
  ...props
}: ComponentPropsWithoutRef<"input"> & { initialValue?: string }) => {
  const [value, setValue] = useState(initialValue ?? "");
  const ref = useRef(null);
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
      ref={ref}
    />
  );
};
