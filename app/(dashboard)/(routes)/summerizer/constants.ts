import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
  lang: z.string().min(1, {
    message: "Language is required."
  }),
});


export const languageOptions = [
  {
    value: "en",
    label: "English"
  },
  {
    value: "es",
    label: "Spanish"
  },
  {
    value: "ar",
    label: "Arabic"
  },
  {
    value: "de",
    label: "German"
  },
  {
    value: "fi",
    label: "Finnish"
  },
  {
    value:"bn",
    label:"Bengali"
  }
];