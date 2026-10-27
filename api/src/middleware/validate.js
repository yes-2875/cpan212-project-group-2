import { HttpError } from "../lib/httpError.js";

export function validate(schema) {
  return (req, res, next) => {
    const errors = schema(req.body);

    if (Object.keys(errors).length > 0) {
      throw new HttpError(400, 'Validation failed', errors);
    }

    next();
  };
}