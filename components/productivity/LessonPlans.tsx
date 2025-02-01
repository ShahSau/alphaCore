import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReactMarkdown from "react-markdown";

const TABS = ["Materials", "Introduction", "Guided Practice", "Closure"];

interface LessonPlansProps {
  plans: string[];
}

export const LessonPlans = ({ plans }: LessonPlansProps) => {
  const [selected, setSelected] = useState(TABS[0]);
  return (
    <section className="overflow-hidden bg-transparent px-4 py-12 text-slate-900">
      <Heading plans={plans} />
      <Tabs selected={selected} setSelected={setSelected} />
      <Plans selected={selected} plans={plans} />
    </section>
  );
};

const Heading = ({ plans }: LessonPlansProps) => {
  console.log(plans);
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="mb-8 text-2xl bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text font-medium text-transparent">
          {plans[0].replace("# ", "")}
        </span>
        <span className="mb-8 text-lg">
          {plans[1].replace("Objective:\n", " ")}
        </span>
      </div>
    </>
  );
};

const Tabs = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-violet-500 text-slate-50"
              : "border-slate-600 bg-transparent text-slate-500"
          }`}
          key={tab}
        >
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

function removeWords(input: string, wordsToRemove: string[]): string {
  wordsToRemove.forEach((word) => {
    input = input.replace(word, "");
  });
  return input.trim();
}

const Plans = ({
  selected,
  plans,
}: {
  selected: string;
  plans: string[];
}) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {plans.map((q, idx) => {
          console.log(TABS.indexOf(selected));
          return TABS.indexOf(selected) + 2 === idx ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
              className="space-y-4"
              key={idx}
            >
              <ReactMarkdown>
                {removeWords(q, [
                  "Materials:",
                  "Introduction:",
                  "Guided Practice:",
                  "Closure:",
                ])}
              </ReactMarkdown>
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};
