import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/db.js';
import joi from "joi";

export async function userLogin (req, res) {
  try {
    /* await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME); */

    const { email, password } = req.body

    const loginSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required()
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.sendStatus(422);
    }

    const user = await db.collection('users').findOne({ email: email });
    console.log(user, password, email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();

      await db.collection('sessions').insertOne({
        token,
        userId: user._id
      });

      return res.status(201).send({ token });
    } else {
      return res.status(401).send('Senha ou email incorretos!');

    }

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

export async function userSignup (req, res) {
  try {
    /* await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME); */

    const { name, email, password } = req.body;

    const userSchema = joi.object({
      name: joi.string().min(1).required(),
      email: joi.string().email().required(),
      password: joi.string().required()
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(422).send({ errorMessage: "Houve problema com os dados enviados" });
    }

    const checkEmailOnDB = await db.collection('users').findOne({ email: email });

    if (checkEmailOnDB) {
      return res.status(409).send({ errorMessage: "E-mail já cadastrado, tente outro email" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await db.collection('users').insertOne({ ...req.body, password: encryptedPassword });
    res.status(201).send({ message: 'Usuário criado com sucesso' });

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};