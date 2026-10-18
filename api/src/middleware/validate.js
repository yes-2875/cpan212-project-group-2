export function validate(schema) {
  return (req, res, next) => {
    const errors = schema(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          details: errors
        }
      });
    }

    next();
  };
}