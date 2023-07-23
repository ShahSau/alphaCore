import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Photo prompt is required"
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo"
  },
  {
    value: "2",
    label: "2 Photos"
  },
  {
    value: "3",
    label: "3 Photos"
  },
  {
    value: "4",
    label: "4 Photos"
  },
  {
    value: "5",
    label: "5 Photos"
  },
  {
    value: "6",
    label: "6 Photos"
  },
  {
    value: "7",
    label: "7 Photos"
  },
  {
    value: "8",
    label: "8 Photos"
  },
  {
    value: "9",
    label: "9 Photos"
  },
];
