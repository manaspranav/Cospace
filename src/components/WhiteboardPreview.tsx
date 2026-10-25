import {
  MousePointer2,
  Pencil,
  Eraser,
  Type,
  Square,
  StickyNote,
} from "lucide-react";

const tools = [MousePointer2, Pencil, Eraser, Type, Square, StickyNote];

// A static picture only. Nothing here is interactive yet.
export default function WhiteboardPreview() {
  return (
    <div
      role="img"
      aria-label="Preview of the CoSpace collaborative whiteboard"
      className="mx-auto mt-14 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-lg"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
            C
          </span>
          <span className="text-sm font-medium text-slate-800">
            Project Brainstorm
          </span>
        </div>
        <div className="flex -space-x-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-xs font-medium text-white">
            A
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-sky-500 text-xs font-medium text-white">
            R
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-xs font-medium text-white">
            S
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Left toolbar */}
        <div className="flex flex-col gap-1 border-r border-slate-200 p-2">
          {tools.map((Tool, index) => (
            <span
              key={index}
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                index === 0
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500"
              }`}
            >
              <Tool size={18} />
            </span>
          ))}
        </div>

        {/* Canvas */}
        <div
          className="relative h-64 flex-1 bg-slate-50 sm:h-80"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* Sticky note */}
          <div className="absolute left-[6%] top-[12%] w-32 -rotate-3 rounded-md bg-yellow-100 p-3 text-xs text-slate-700 shadow-md sm:w-40">
            Pick a project topic
          </div>

          {/* Shape */}
          <div className="absolute left-[42%] top-[30%] flex h-16 w-32 items-center justify-center rounded-lg border-2 border-indigo-400 bg-white text-xs font-medium text-indigo-700 sm:w-40">
            Plan features
          </div>

          {/* Second sticky note */}
          <div className="absolute bottom-[10%] right-[8%] w-28 rotate-2 rounded-md bg-pink-100 p-3 text-xs text-slate-700 shadow-md sm:w-36">
            Share the invite link
          </div>

          {/* Live cursors */}
          <div className="absolute left-[34%] top-[52%] flex items-start">
            <MousePointer2 size={18} className="fill-sky-500 text-sky-500" />
            <span className="-mt-1 ml-1 rounded-full bg-sky-500 px-2 py-0.5 text-xs text-white">
              Asritha
            </span>
          </div>
          <div className="absolute right-[26%] top-[14%] flex items-start">
            <MousePointer2 size={18} className="fill-emerald-500 text-emerald-500" />
            <span className="-mt-1 ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
              Sam
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}