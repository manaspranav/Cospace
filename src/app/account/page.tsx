"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AccountPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  if (isPending) {
    return <main className="p-8 text-gray-600">Loading...</main>;
  }

  if (!session) {
    return (
      <main className="p-8 text-gray-700">
        You are not logged in. <a href="/login" className="text-indigo-600 underline">Log in</a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Your account</h1>
        <p className="text-gray-700">Name: {session.user.name}</p>
        <p className="text-gray-700">Email: {session.user.email}</p>
        <button
          onClick={handleSignOut}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}