import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
  fromLang: z.string().min(1, {
    message: "From Language is required.",
  }),
  toLang: z.string().min(1, {
    message: "To Language is required.",
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
