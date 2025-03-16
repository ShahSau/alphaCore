import * as z from "zod";

export const formSchema = z.object({
  gender: z.string().min(1, {
    message: "Prompt is required"
  }),
  age: z.string().min(1, {
    message: "Prompt is required"
  }),
  ethnicity: z.string().min(1, {
    message: "Prompt is required"
  }),
});

export const genderOptions = [
  { value: "female",
    label:"Female"
  },
  { value: "male",
    label:"Male"
  }
];

export const ageOptions = [
  { label:"10-19",
    value:"10s"
  },
  { label: "20-29",
    value:"20s"
  },
  { label: "30-39",
    value:"30s"
  },
  { label: "40-49",
    value:"40s"
  },
  { label: "50-59",
    value:"50s"
  },
  { label: "60-69",
    value:"60s"
  }
];

export const ethnicityOptions = [
  { value: "european",
    label:"European"
  },
  { value: "african",
    label:"African"
  },
  { value: "west_asian",
    label:"West Asian"
  },
  { value: "south_asian",
    label:"South Asian"
  },
  { value: "east_asian",
    label:"East Asian"
  },
  { value: "southeast_asian",
    label:"Southeast Asian"
  },
  { value: "latin_american",
    label:"Latin American"
  }
];
