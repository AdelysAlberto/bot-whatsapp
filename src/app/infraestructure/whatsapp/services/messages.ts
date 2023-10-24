import WAWebJS from 'whatsapp-web.js';
import { TRawData } from '../interfaces';
import { chatGPT } from '../../chatgpt';

export const listenerMessage = async (message: WAWebJS.Message) => {
  let maps = '';
  const { deviceType, rawData } = message;

  const { body, from, type, isForwarded, notifyName, author, lat, lng } = rawData as TRawData;

  if (type === 'location') {
    maps = `https://www.google.com/maps/place/@${lat},${lng},17z`;
  }
  const dataMessage = {
    from,
    author,
    name: notifyName,
    body,
    type,
    deviceType,
    isForwarded,
    maps
  };
  console.log(dataMessage);
  // const phoneNumber = from.split('@')[0];
  // && from !== 'status@broadcast'
  if ((type === 'chat' || type === 'location')) {
    const oldMessage = body.toLowerCase();
    if (oldMessage.includes('click')) {
      const newBody = oldMessage.replace('click', '').replace(', ', ' ');
      const promptStructure = {
        name: dataMessage.name,
        message: newBody
      };
      console.log(promptStructure);
      const resultado = await chatGPT(promptStructure);

      (await message.getChat()).sendStateTyping();

      console.log(`Response ChatGPT ${resultado}`);
      // message.react('U+1F604');
      message.reply(resultado);
    }
  }
};
