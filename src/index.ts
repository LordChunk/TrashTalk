import { Configuration, OpenAIApi } from "openai";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "gpt-3.5-turbo",
  prompt: "Give me backhanded compliments for people throwing rubbish in a bin.",
});

console.log(completion.data.choices[0].text);