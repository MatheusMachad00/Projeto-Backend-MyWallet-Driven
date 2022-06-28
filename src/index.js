import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
import dayjs from "dayjs";
import joi from "joi";
import chalk from 'chalk'

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

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
    mongoClient.close();
  }
});

app.post("/sig-up", async (req, res) => {
	try {
    await mongoClient.connect();
		const db = mongoClient.db(process.env.DB_NAME);

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
