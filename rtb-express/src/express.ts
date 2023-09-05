import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DbConnection from './db/mongo';
import { UserService } from './service/userService';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use([cors(), express.json()]);

app.route('/users')
  .get(async (req, res) => {
    const data = await UserService.getUsersData();
    res.send(data);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const response = await UserService.storeUser(req.body);
    res.send(response);
  })
  .put(async (req, res) => {
    console.log(req.body);
    await UserService.markVisited(req.body);
    res.sendStatus(201)
  })

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

DbConnection.init().then(async () => {
  console.log('Mongo connection established');
}).catch(er => console.log(er));