import joi from "joi";

export async function validateLogin(req, res, next){
  const loginData = req.body

  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  });

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.sendStatus(422);
  }
  
  res.locals.loginData = loginData;

  next();
};