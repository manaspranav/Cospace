import ButtonLink from "@/components/ButtonLink";
import FeatureCard from "@/components/FeatureCard";
import WhiteboardPreview from "@/components/WhiteboardPreview";
import { Users, Mic, ClipboardList, Save } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Live collaboration",
    description: "Draw, write and move ideas on one shared board together.",
  },
  {
    icon: Mic,
    title: "Voice chat",
    description: "Talk with your team while you work, right inside the room.",
  },
  {
    icon: ClipboardList,
    title: "Planning",
    description: "Keep tasks and notes next to the board so plans don't get lost.",
  },
  {
    icon: Save,
    title: "Saved workspaces",
    description: "Come back later and reopen your boards exactly as you left them.",
  },
];

const steps = [
  {
    title: "Create a room",
    description: "Name your room and pick a display name. It takes a few seconds.",
  },
  {
    title: "Invite your team",
    description: "Copy the invitation link and share it with the people you want to work with.",
  },
  {
    title: "Collaborate",
    description: "Draw, talk and plan together on the same board in real time.",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="mb-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          Ideas Meet Here.
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Plan, draw and collaborate together in real time
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          CoSpace is a shared workspace for college projects, brainstorms and
          trips. Sketch ideas on one board and plan together in one place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/create-room">Create a Room</ButtonLink>
          <ButtonLink href="/join-room" variant="secondary">
            Join a Room
          </ButtonLink>
        </div>

        <WhiteboardPreview />
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6"
      >
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Everything your team needs in one place
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            How it works
          </h2>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col items-center text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}