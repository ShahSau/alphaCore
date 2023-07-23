import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Logo prompt is required"
  }),
  amount: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Logo"
  },
  {
    value: "2",
    label: "2 Logos"
  },
  {
    value: "3",
    label: "3 Logos"
  },
  {
    value: "4",
    label: "4 Logos"
  },
  {
    value: "5",
    label: "5 Logos"
  },
  {
    value: "6",
    label: "6 Logos"
  },
  {
    value: "7",
    label: "7 Logos"
  },
  {
    value: "8",
    label: "8 Logos"
  },
  {
    value: "9",
    label: "9 Logos"
  },
];
