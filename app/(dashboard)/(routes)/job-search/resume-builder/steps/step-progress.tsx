"use client"

import React from "react"
import { AnimatePresence, motion } from "framer-motion"

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function StepProgress({ currentStep, totalSteps, steps }: StepProgressProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center justify-between gap-3">
        {steps.map((step, index) => {
          const stepNum = index + 1
          const isActive = stepNum <= currentStep + 1
          const isCompleted = index < currentStep
          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-2">
                <Step num={stepNum} isActive={isActive} isCompleted={isCompleted} />
                <span
                  className={`text-xs font-medium text-center hidden sm:block transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div className="w-full h-1 rounded-full bg-secondary relative self-start mt-5">
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 bg-primary rounded-full"
                    animate={{ width: isCompleted ? "100%" : 0 }}
                    transition={{ ease: "easeIn", duration: 0.3 }}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

function Step({
  num,
  isActive,
  isCompleted,
}: {
  num: number
  isActive: boolean
  isCompleted: boolean
}) {
  return (
    <div className="relative">
      <div
        className={`w-10 h-10 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-sm relative z-10 transition-colors duration-300 ${
          isActive
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/30 text-muted-foreground"
        }`}
      >
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.svg
              key="icon-marker-check"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1.6em"
              width="1.6em"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </motion.svg>
          ) : (
            <motion.span
              key="icon-marker-num"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              {num}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isActive && !isCompleted && (
        <div className="absolute z-0 -inset-1.5 bg-primary/20 rounded-full animate-pulse" />
      )}
    </div>
  )
}
