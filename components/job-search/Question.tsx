import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff} from "lucide-react";
import useMeasure from "react-use-measure";

interface QuestionProps {
  question: string;
  answer: string;
}

const Question = ({ question, answer }: QuestionProps) => {
    const [ref, { height }] = useMeasure();
    const [open, setOpen] = useState(false);
  
    return (
      <motion.div
        animate={open ? "open" : "closed"}
        className={`rounded-xl border-[1px] border-slate-700 px-4 transition-colors mb-6 ${
          open ? "bg-slate-800" : "bg-slate-900"
        }`}
        
      >
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex w-full items-center justify-between gap-4 py-4"
        >
          <span
            className={`text-left text-lg font-medium transition-colors ${
              open ? "text-slate-50" : "text-slate-400"
            }`}
          >
            {question}
          </span>
          <motion.span>
            {
              open ? 
              <EyeOff className="text-2xl text-slate-50 transition-colors" /> 
              : 
              <Eye className="text-2xl text-slate-400 transition-colors"/>
          }
          </motion.span>
        </button>
        <motion.div
          initial={false}
          animate={{
            height: open ? height : "0px",
            marginBottom: open ? "24px" : "0px",
          }}
          className="overflow-hidden text-slate-400"
        >
          <p ref={ref}>{answer}</p>
        </motion.div>
      </motion.div>
    );
  };

  export default Question;