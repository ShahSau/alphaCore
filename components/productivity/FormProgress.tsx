import React, { useState } from "react";
import Steps from "./Steps";
import RadioForm from "./RadioForm";

interface Question {
  fieldType: string;
  text: string;
  fieldOptions: string[];
}

interface SteppedProgressProps {
  questions: Question[];
}

const SteppedProgress: React.FC<any> = ({ questions }) => {
  const [stepsComplete, setStepsComplete] = useState(0);
  const numSteps = questions.length;

  const handleSetStep = (num: -1 | 1) => {
    if (
      (stepsComplete === 0 && num === -1) ||
      (stepsComplete === numSteps && num === 1)
    ) {
      return;
    }

    setStepsComplete((pv) => pv + num);
  };

  return (
    <div className="px-4 py-14 w-full">
      <div className="p-8 bg-white shadow-lg rounded-md mx-auto">
        <Steps numSteps={numSteps} stepsComplete={stepsComplete} />
        <div className="p-2 my-6 bg-gray-100 border-2 border-dashed border-gray-200 rounded-lg">
          {questions[stepsComplete].fieldType === "RadioGroup" ||
          questions[stepsComplete].fieldType === "Select" ? (
            <RadioForm
              question={questions[stepsComplete].text}
              options={questions[stepsComplete].fieldOptions}
            />
          ) : (
            <div>
              <label
                htmlFor="comment"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {questions[stepsComplete].text}
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
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            className="px-4 py-1 rounded hover:bg-gray-100 text-black"
            onClick={() => handleSetStep(-1)}
          >
            Prev
          </button>
          {stepsComplete !== questions.length - 1 ? (
            <button
              className="px-4 py-1 rounded bg-black text-white"
              onClick={() => handleSetStep(1)}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-1 rounded bg-black text-white"
              onClick={() => alert("Form Submitted")}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SteppedProgress;
