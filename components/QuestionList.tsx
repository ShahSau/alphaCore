import React from "react";
import { motion } from "framer-motion";

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
          transition={{ delay: index * 0.2, duration: 0.5 }}
          style={{ marginBottom: "10px" }}
        >
          {question}
        </motion.div>
      ))}
    </div>
  );
};

export default QuestionList;
