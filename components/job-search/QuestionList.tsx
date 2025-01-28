import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Question from "./Question";

interface QuestionProps {
  question: string;
  answer: string;
}
interface QuestionListProps{
  questions: QuestionProps[];
}

const QuestionList: FC<QuestionListProps> = ({ questions }) => {
console.log(questions);
    return (
        <section className="overflow-hidden bg-slate-900 px-4 py-12 text-slate-50">
            <div className="mx-auto mt-12 max-w-3xl">
            <AnimatePresence mode="wait">
                {questions.map((questionObj, index) => (
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                        duration: 0.5,
                        ease: "backIn",
                        delay: index * 0.4,
                    }}
                    className="space-y-4"
                    key={index}
                    >
                    <Question question={questionObj.question} answer={questionObj.answer} />
    
                    </motion.div>
                ))}
            </AnimatePresence>
            </div>
        </section>
      );
};

export default QuestionList;
