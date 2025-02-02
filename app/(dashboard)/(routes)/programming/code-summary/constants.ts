import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
  lang: z.string().min(1, {
    message: "Language is required.",
  }),
});

export const languageOptions = [
  {
    value: "JS",
    label: "JavaScript",
  },
  {
    value: "Python",
    label: "Python",
  },
  {
    value: "Java",
    label: "Java",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "C++",
    label: "C++",
  },
];
