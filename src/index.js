import express from 'express';
import cors from 'cors';
import chalk from 'chalk'
import { userLogin, userSignup } from './controllers/userController.js';
import { activityStatement, activityIn, activityOut } from './controllers/activityController.js';


const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", userLogin );

app.post("/sign-up", userSignup);

app.get("/activity/:userId", activityStatement);

app.post("/in", activityIn);

app.post("/out", activityIn);

app.listen(5000, () => {
  console.log(
    chalk.hex('#00ffff').bold("Server is running on: http://localhost:5000")
  );
});
