import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
/* import dayjs from "dayjs"; */
import joi from "joi";
import chalk from 'chalk'
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.URL_MONGO);
let db;

app.post("/login", async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);

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

      res.status(201).send({ token });
      mongoClient.close();
      return;
    } else {
      res.status(401).send('Senha ou email incorretos!');
      mongoClient.close();
      return;
    }

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
    mongoClient.close();
  }
});

app.post("/sign-up", async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);

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
    mongoClient.close();

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
    mongoClient.close();
  }
});

app.get("/activity/:userId", async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
    mongoClient.close();
  }
});

app.post("/in", async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
    mongoClient.close();
  }
});

app.post("/out", async (req, res) => {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME);

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
    mongoClient.close();
  }
});

app.listen(5000, () => {
  console.log(
    chalk.hex('#00ffff').bold("Server is running on: http://localhost:5000")
  );
});
