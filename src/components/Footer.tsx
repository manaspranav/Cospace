import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Logo />
          <p className="text-sm text-slate-500">Ideas Meet Here.</p>
        </div>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} CoSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}