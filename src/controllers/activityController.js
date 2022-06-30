import db from '../database/db.js';

export async function activityStatement (req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    if(!token) return res.sendStatus(400);
    console.log(token)

    
    const session = await db.collections("sessions").findOne({ token });
    console.log(session)

    if (!session) return res.sendStatus(404);

    const user = await db.collections("users").findOne({_id: session.userId })
    console.log(user)



  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

export async function activityIn (req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    if(!token) return res.sendStatus(400);
    
    const session = await db.collections("sessions").findOne({ token });
    console.log(session)

    if (!session) return res.sendStatus(404);

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

export async function activityOut (req, res) {
  try {
    /* await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_NAME); */

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};