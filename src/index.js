import express from 'express';
import cors from 'cors';
import chalk from 'chalk'
import authRoute from "./routes/authRoute.js";
import activityRoute from "./routes/activityRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoute);
app.use(activityRoute);

app.listen(5000, () => {
  console.log(
    chalk.hex('#00ffff').bold("Server is running on: http://localhost:5000")
  );
});