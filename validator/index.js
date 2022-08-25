const Joi = require("joi");

const createPostSchema = Joi.object().keys({
  title:        Joi.string()
                  .min(4)
                  .max(150)
                  .required(),
  description:  Joi.string()
                  .min(10)
                  .max(2000)
                  .required()
});
// exports.createPostValidator = (req, res, next) => {
//   // body('title', "Write a Title").notEmpty();
//   body('title', "Title must be between 4 to 150 characters").isLength({
//     min: 4,
//     max: 150
//   });

//   // body('description', 'Write a description').noEmpty();
//   body('description', "Description must be between 4 to 2000 characters").isLength({
//     min: 4,
//     max: 2000
//   });

//   const errors = validationResult(req);

//   if (errors.isEmpty()) {
//     // const firstError = errors.map((error) => error.msg)[0];
//     return res.status(400).json({
//       error: errors.array()
//     });
//   } else {
//     console.log("Error: not caught: ", errors);
//     return;
//   }
//   // proceed to next middleware
//   next();
// };