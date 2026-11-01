"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FormEvent } from "react";

function extractRoomId(input: string): string | null {
  const text = input.trim();

  const fromLink = text.match(/\/room\/([A-Za-z0-9_-]+)/);
  if (fromLink) {
    return fromLink[1];
  }

  if (/^[A-Za-z0-9_-]{3,64}$/.test(text)) {
    return text;
  }

  return null;
}

export default function JoinRoomPage() {
  const [roomInput, setRoomInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const roomId = extractRoomId(roomInput);

    if (!roomId) {
      setError("Enter a valid room ID or invitation link.");
      return;
    }

    setError("");
    router.push(`/room/${roomId}`);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Join a room
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Paste a room ID or an invitation link to join your team.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="room-input"
              className="block text-sm font-medium text-slate-700"
            >
              Room ID or invitation link
            </label>
            <input
              id="room-input"
              type="text"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              placeholder="e.g. a3091c7db20e"
              aria-invalid={error ? true : false}
              aria-describedby={error ? "room-input-error" : undefined}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
              }`}
            />
            {error && (
              <p
                id="room-input-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Join Room
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-700">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}