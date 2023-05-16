import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config({ path: __dirname + '/.env' });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured',
      },
    });
    return;
  }

  const question = req.body.question || '';

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${question}:`,
    temperature: 0,
    max_tokens: 1000,
  });

  res.status(200).json({ result: response.data.choices[0].text });
}