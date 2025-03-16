import React from "react";

interface RadioFormProps {
  question: string;
  options: { text: string; value: string }[];
}

const RadioForm: React.FC<RadioFormProps> = ({ question, options }) => {
  return (
    <fieldset>
      <p className="mt-1 text-sm/6 text-gray-600">{question}</p>
      <div className="mt-6 space-y-6 flex items-center sm:space-x-10 sm:space-y-0">
        {options.map((option, index) => (
          <div className="flex gap-10" key={index}>
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor={option.text}
              >
                <input
                  name="framework"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id={option.text}
                  defaultChecked={index === 0}
                  value={option.value}
                />
                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-slate-600 cursor-pointer text-sm"
                htmlFor="html"
              >
                {option.text}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioForm;
