import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Photo prompt is required",
  }),
  mood: z.string().min(1),
  language: z.string().min(1),
  type: z.string().min(1),
  name: z.string().min(1),
  extra: z.string(),
});

export const moodOptions = [
  {
    value: "Choose the tone of your email",
    label: "Choose the tone of your email*",
  },
  {
    value: "Professional",
    label: "Professional",
  },
  {
    value: "Friendly",
    label: "Friendly",
  },
  {
    value: "Funny",
    label: "Funny",
  },
  {
    value: "Formal",
    label: "Formal",
  },
  {
    value: "Negative",
    label: "Negative",
  },
];

export const languagesOptions = [
  {
    value: "Choose a language",
    label: "Choose a language*",
  },
  {
    value: "English",
    label: "English",
  },
  {
    value: "Spanish",
    label: "Spanish",
  },
  {
    value: "French",
    label: "French",
  },
  {
    value: "German",
    label: "German",
  },
];
export const typeOptions = [
  {
    value: "Choose the type of email",
    label: "Choose the type of email*",
  },
  {
    value: "Business",
    label: "Business",
  },
  {
    value: "Personal",
    label: "Personal",
  },
];
