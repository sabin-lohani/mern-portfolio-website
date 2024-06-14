import { z } from "zod";

const pollSchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters long"),
  options: z
    .array(
      z.object({
        name: z.string().min(1, "Option must be at least 1 character long"),
      })
    )
    .min(2, "Poll must have at least 2 options"),
});

export default pollSchema;
