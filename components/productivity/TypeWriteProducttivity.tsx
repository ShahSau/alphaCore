import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const LETTER_DELAY = 0.025;

const Typewrite = ({ message, keyword }: { message: string, keyword: string[] }) => {
  return (
    <div className="text-sm font-light">
      <span className="inline-block size-2 bg-neutral-950" />
      <span className="ml-3">
        {message.split("").map((l, i) => (
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: i * LETTER_DELAY,
              duration: 0,
            }}
            key={i}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: i * LETTER_DELAY,
                  times: [0, 0.1, 1],
                  ease: "easeInOut",
                }}
                className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
              />
            </motion.span>
          </motion.span>
        ))}
        {message && keyword.length > 0 && <p className="text-sm font-light mt-4 mb-2">Keywords:</p>}
        {keyword.map((l, i) => (
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: i * .5,
              duration: 0.5,
            }}
            key={i}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay:i * .5,
                duration: 0,
              }}
            >
              <Button className="mr-2" size="sm" variant="secondary">{l}</Button>
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: i * .5,
                  times: [0, 0.1, 1],
                  ease: "easeInOut",
                }}
                className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
              />
            </motion.span>
          </motion.span>
        ))}
      </span>
    </div>
  );
};

export default Typewrite;
