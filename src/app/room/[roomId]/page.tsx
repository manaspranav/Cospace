export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Workspace
        </h1>
        <p className="mt-2 text-sm text-slate-600">You are in room:</p>
        <p className="mt-3 inline-block rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm text-slate-800">
          {roomId}
        </p>
        <p className="mt-6 text-xs text-slate-500">
          The whiteboard is built in a later milestone.
        </p>
      </div>
    </main>
  );
}