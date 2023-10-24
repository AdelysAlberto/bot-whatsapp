import { Request, Response } from 'express';
import { client, sendMessage } from './infraestructure/whatsapp/init';
const express = require('express');

const app = express();

app.use(express.json());

app.post('/send', function (req: Request, res: Response) {
  const { number, message } = req.body;

  sendMessage(number, message);
  res.send('POST request to the homepage');
});

app.listen(4550, () => {
  console.log(`El server esta listo por el puerto ${4550}`);
  client.initialize();
});
