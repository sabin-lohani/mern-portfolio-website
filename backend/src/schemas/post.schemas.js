import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  subtitle: z.string(),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

export default postSchema;
