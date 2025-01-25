import React, {FC} from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

// const string = `1. How would you rate your current understanding of JavaScript?
//  a) Beginner
//  b) Intermediate
//  c) Advanced
//  d) Not sure

// 2. How comfortable are you with writing JavaScript code from scratch?
//  a) Very comfortable
//  b) Comfortable
//  c) Somewhat comfortable
//  d) Not comfortable

// 3. Have you completed any online courses or tutorials on JavaScript before?
//  a) Yes, I have completed one or more courses
//  b) No, I have not completed any courses

// 4. Which aspects of JavaScript are you most interested in learning about in this class? (Select all that apply)
//  a) Fundamentals of JavaScript
//  b) DOM Manipulation
//  c) Event Handling
//  d) AJAX and APIs
//  e) ES6 and newer features
//  f) Node.js and server-side development

// 5. How do you plan to apply your JavaScript knowledge after completing this class?
//  a) Personal projects
//  b) Professional development
//  c) Both

// 6. How confident are you in your problem-solving skills when working with JavaScript?
//  a) Very confident
//  b) Confident
//  c) Somewhat confident
//  d) Not confident

// 7. Would you like more practice exercises and coding challenges included in the course curriculum?
//  a) Yes, I would like more practice exercises
//  b) No, I prefer less focus on practice exercises

// 8. How would you prefer to learn JavaScript in this online class?
//  a) Video lectures
//  b) Written tutorials
//  c) Interactive coding exercises
//  d) Live coding sessions

// 9. Do you have any specific goals or projects in mind that you would like to accomplish using JavaScript?
//  a) Yes
//  b) No

// 10. On a scale of 1-10, how excited are you to learn JavaScript in this online class? (1 being not excited at all, 10 being extremely excited)`;

interface QuestionnaireProps {
  string: string;
}

const Questionnaire: FC<QuestionnaireProps> = ({ string }) => {
  const questions = string.split('\n\n').map(q => q.split('\n'));
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
        {question[0].includes('Open-ended question') ? (
          question.map((line: string, lineIndex: number) => (
            <div>
                <label htmlFor="comment" className="block text-sm/6 font-medium text-gray-900">
                    {line}
                </label>
                <div className="mt-2">
                    <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        defaultValue={''}
                    />
                </div>
            </div>
          ))
        ) : (
            <div>
                <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900">
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