import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import generateImage from './qrImage';

import { listenerMessage } from './services/messages';

// set options with localAutht, this save the actual session
const opt = {
  authStrategy: new LocalAuth({ clientId: 'client-one' }),
  puppeteer: {
    args: ['--no-sandbox']
  }
};

const client = new Client(opt);

client.on('call', () => {
  console.log('call?');
});

client.on('qr', qr => {
  generateImage(qr);
  qrcode.generate(qr, { small: true });
  console.log('⚡ Recuerda que el QR se actualiza cada minuto ⚡\'');
  console.log('⚡ Actualiza F5 el navegador para mantener el mejor QR⚡');
});

client.on('auth_failure', () => {
  console.log('auth falied');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  // type=ptt is a voice note
  // type=location is a shared location
  listenerMessage(message);
});

client.on('disconnected', () => {
  console.log('disconected');
});

// client.on('message_create', (message) => {
//   console.log('Mensaje creado', message);
//   const { rawData } = message;
//   const { from } = rawData as TRawData;
//   const phoneNumber = from.split('@')[0];

//   // sendMessage(phoneNumber, 'Auto Enviado?');
// });

const sendMessage = (to: string, message: string) => {
  console.log(to, message);
  client.sendMessage(`${to}@c.us`, message);
};

export { client, sendMessage };
