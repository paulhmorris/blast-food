import { IoRocketSharp } from "react-icons/io5";

export const Title = () => {
  return (
    <div className="space-y-2 text-center">
      <h1
        aria-describedby="subtitle"
        className="inline-flex items-center gap-6 text-7xl text-slate-800"
      >
        Blast Food <IoRocketSharp className="-mr-6 h-14 w-14 text-rose-800" />
      </h1>
      <p id="subtitle" className="text-2xl font-semibold text-rose-700">
        Taking Ordering to the Moon
      </p>
    </div>
  );
};
