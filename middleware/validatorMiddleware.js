// const Joi = require("joi");
// const schemas = require("../validator/schemas");
exports.middleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      allowUnknown: true
    });
    const valid = error == null;
    if(valid) {
      next();
    } else {
      // console.log(error);
      const { details } = error;
      const message = details.map(i => i.message).join(', ');
      // console.log("error: ", message);
      res.status(422).json({ error: message });
    }
  };
}