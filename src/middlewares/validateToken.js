import db from '../database/db.js';

export async function validateToken (req, res, next){
  const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    if(!token) return res.sendStatus(400);

    const data = await db.collection("users").findOne({ session: token });
    console.log(data)

    if (!data) return res.sendStatus(404);

    res.locals.userData = data;

    next();
};