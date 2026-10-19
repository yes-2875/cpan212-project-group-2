export function validate(schema) {
  return (req, res, next) => {
    const errors = schema(req.body);

    if (Object.keys(errors).length > 0) {
      
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = errors;
      return next(err);
    }

    next();
  };
}