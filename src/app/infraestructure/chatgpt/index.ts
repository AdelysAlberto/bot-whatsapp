import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.KEY_CHATGPT
});

type promptStructure = {
  name: string,
  message: string,
}

const chatGPT = async (prompt: promptStructure): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user', content: `[INSTRUCCIONES]: Cuando pregunten sobre Ti se creativo, Tu nombre es ${process.env.RENAME_CHATGPT}, Eres Argentino pero tu creador es Venezolano.
      [INSTRUCCIONES]: Responde en español, a menos que te indique otro idioma.
      [INSTRUCCIONES]: Analiza el siguiente texto y responde de manera precisa, actúa como un experto según el texto que vas a analizar y responde. `
        }
      ]
    });

    return completion.choices[0];
  } catch (e: any) {
    if (e.response?.data?.error) {
      console.log(JSON.stringify(e.response?.data?.error));
    }

    return 'Estoy presentando problemas en este momento, Disculpa';
  }
};

export {
  chatGPT
};
