"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

type FormErrors = {
  roomName?: string;
  displayName?: string;
};

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedRoom = roomName.trim();
    const trimmedName = displayName.trim();
    const newErrors: FormErrors = {};

    if (!trimmedRoom) {
      newErrors.roomName = "Please enter a room name.";
    } else if (trimmedRoom.length < 3) {
      newErrors.roomName = "Room name must be at least 3 characters.";
    }

    if (!trimmedName) {
      newErrors.displayName = "Please enter your display name.";
    } else if (trimmedName.length < 2) {
      newErrors.displayName = "Display name must be at least 2 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setServerError("");
    setSubmitting(true);

    let roomId: string;
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName: trimmedRoom }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Could not create the room.");
        setSubmitting(false);
        return;
      }
      roomId = data.roomId;
    } catch {
      setServerError("Network problem. Please try again.");
      setSubmitting(false);
      return;
    }

    try {
      sessionStorage.setItem(
        `cospace:room:${roomId}`,
        JSON.stringify({ roomName: trimmedRoom, displayName: trimmedName })
      );
    } catch {
      // Storage can be blocked by the browser. We still open the room.
    }

    router.push(`/room/${roomId}`);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create a room
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Start a shared workspace and invite your team.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="room-name"
              className="block text-sm font-medium text-slate-700"
            >
              Room name
            </label>
            <input
              id="room-name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. Project Brainstorm"
              aria-invalid={errors.roomName ? true : false}
              aria-describedby={errors.roomName ? "room-name-error" : undefined}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                errors.roomName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
              }`}
            />
            {errors.roomName && (
              <p
                id="room-name-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {errors.roomName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="display-name"
              className="block text-sm font-medium text-slate-700"
            >
              Your display name
            </label>
            <input
              id="display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Manas"
              aria-invalid={errors.displayName ? true : false}
              aria-describedby={
                errors.displayName ? "display-name-error" : undefined
              }
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                errors.displayName
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
              }`}
            />
            {errors.displayName && (
              <p
                id="display-name-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {errors.displayName}
              </p>
            )}
          </div>

          {serverError && (
            <p role="alert" className="text-sm text-red-600">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Room"}
          </button>
        </form>
      </div>
    </main>
  );
}