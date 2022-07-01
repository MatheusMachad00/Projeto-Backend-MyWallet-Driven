import db from '../database/db.js';
import dayjs from "dayjs";

export async function activityStatement(req, res) {
  try {
    const userData = res.locals.userData;

    const user = await db.collection("users").findOne({ _id: userData._id })

    res.send({activity: user.activity, name: user.name});
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

export async function activityIn(req, res) {
  try {
    const inOutData = res.locals.inOutData;
    const userData = res.locals.userData;
    const date = dayjs().locale("pt-br").format("DD/MM");

    await db.collection('users').updateOne({
      _id: userData._id
    }, { $push: { activity: { ...inOutData, type: 'in', date: date} } });

    res.status(201).send({ message: "tudo ok" });

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

export async function activityOut(req, res) {
  try {
    const inOutData = res.locals.inOutData;
    const userData = res.locals.userData;
    const date = dayjs().locale("pt-br").format("DD/MM");

    await db.collection('users').updateOne({
      _id: userData._id
    }, { $push: { activity: { ...inOutData, type: 'out', date: date } } });

    res.status(201).send({ message: "tudo ok" });

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};