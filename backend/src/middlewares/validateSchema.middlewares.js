import ApiError from "../utils/ApiError.js";

const validateSchema = (schema) => async (req, _, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    next(new ApiError(422, err.errors[0].message || "Invalid input"));
  }
};

export default validateSchema;
