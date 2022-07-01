import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/db.js';

export async function userLogin(req, res) {
  try {
    const loginData = res.locals.loginData;
    const user = await db.collection('users').findOne({ email: loginData.email });

    if (user && bcrypt.compareSync(loginData.password, user.password)) {
      const token = uuid();

      /* await db.collection('sessions').insertOne({
        token,
        userId: user._id
      }); */
console.log(user._id)

      await db.collection('users').updateOne({
        _id: user._id
      }, { $set: { session: token } });

      return res.status(201).send({ token });
    } else {
      return res.status(401).send('Senha ou email incorretos!');

    }

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};

export async function userSignup(req, res) {
  try {
    const signUpData = res.locals.signUpData;

    const encryptedPassword = bcrypt.hashSync(signUpData.password, 10);

    await db.collection('users').insertOne({ ...signUpData, password: encryptedPassword });
    res.status(201).send({ message: 'Usuário criado com sucesso' });

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
};