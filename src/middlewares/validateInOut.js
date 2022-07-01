import joi from "joi";

export async function validateInOut(req, res, next) {
  const inOut = req.body;

  const inOutSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required()
  });

  const { error } = inOutSchema.validate(inOut);

  if (error) {
    return res.sendStatus(422);
  }

  res.locals.inOutData = inOut;

  next();
};