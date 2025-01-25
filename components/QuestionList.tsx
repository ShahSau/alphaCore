import React from 'react';
import { motion } from 'framer-motion';

// const questions = [
//   "What inspired you to start writing science fiction?",
//   "How do you approach creating futuristic worlds and advanced technologies in your writing?",
//   "Can you tell us about a specific book or story that has had a lasting impact on you as a writer?",
//   "What challenges do you face when trying to make your science fiction stories believable and engaging for readers?",
//   "How do you think science fiction can help us explore and understand current societal issues and trends?",
//   "Do you have a favorite sub-genre of science fiction that you enjoy writing or reading the most?",
//   "How important is scientific accuracy in your writing, and how do you balance that with the need for creativity and imagination?",
//   "Are there any upcoming projects or ideas that you're particularly excited about sharing with your readers?"
// ];

interface QuestionListProps {
  questions: string[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }} // Adjust delay and duration as needed
          style={{ marginBottom: '10px' }} // Space between questions
        >
          {question}
        </motion.div>
      ))}
    </div>
  );
};

export default QuestionList;