import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold text-slate-900"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
        C
      </span>
      <span className="text-lg tracking-tight">CoSpace</span>
    </Link>
  );
}