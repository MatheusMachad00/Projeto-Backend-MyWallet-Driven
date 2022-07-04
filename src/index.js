import express from 'express';
import cors from 'cors';
import chalk from 'chalk'
import authRoute from "./routes/authRouter.js";
import activityRoute from "./routes/activityRouter.js";
import { validateToken } from './middlewares/validateToken.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoute);
app.use(validateToken, activityRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    chalk.hex('#00ffff').bold("Server is running on: http://localhost:5000")
  );
});