"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ButtonLink from "./ButtonLink";
import { authClient } from "@/lib/auth-client";

const links = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    setOpen(false);
    await authClient.signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main"
      >
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          {!isPending &&
            (session ? (
              <>
                <span className="text-sm font-medium text-slate-700">
                  {session.user.name}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Log in
              </Link>
            ))}
          <ButtonLink href="/create-room">Create Room</ButtonLink>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            {!isPending &&
              (session ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg px-2 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Sign out ({session.user.name})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Log in
                </Link>
              ))}
            <ButtonLink href="/create-room">Create Room</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}