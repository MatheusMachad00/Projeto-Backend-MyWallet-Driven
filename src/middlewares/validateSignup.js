import db from '../database/db.js';
import joi from "joi";

export async function validateSignup(req, res, next){
  const signUpData = req.body;

  const userSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().required()
  });

  const { error } = userSchema.validate(signUpData);

  if (error) {
    return res.status(422).send({ errorMessage: "Houve problema com os dados enviados" });
  }

  const checkEmailOnDB = await db.collection('users').findOne({ email: signUpData.email });

  if (checkEmailOnDB) {
    return res.status(409).send({ errorMessage: "E-mail já cadastrado, tente outro email" });
  }

  res.locals.signUpData = signUpData;
  next();
};