import React, { FC } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

interface QuestionnaireProps {
  string: string;
}

const Questionnaire: FC<QuestionnaireProps> = ({ string }) => {
  const questions = string.split("\n\n").map((q) => q.split("\n"));
  questions.pop(); // removing thank you message

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {questions.map((question, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg mb-4 w-80 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {question[0].includes("Open-ended question") ? (
            question.map((line: string, lineIndex: number) => (
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {line}
                </label>
                <div className="mt-2">
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>
              <label
                htmlFor="location"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {question[0]}
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="location"
                  name="location"
                  defaultValue="Canada"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  {question.slice(1).map((option, optionIndex) => (
                    <option key={optionIndex}>{option}</option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Questionnaire;
