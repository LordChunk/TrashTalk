import { Configuration, OpenAIApi } from "openai";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import fs from "fs";
import Audic from 'audic';

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
  model: "text-davinci-003",
  prompt: "Give me a backhanded compliment for throwing trash in a bin.",
  max_tokens: 40,
});

const text = completion.data.choices[0].text;
console.log(text);

// Create client and load credentials from .json
const client = new TextToSpeechClient();

const dialects = [
  "en-AU",
  "en-IN",
  "en-GB",
  "en-US",
];

const [response] = await client.synthesizeSpeech({
  input: { text },
  voice: {
    // Pick a random dialect
    languageCode: dialects[Math.floor(Math.random() * dialects.length)],
    ssmlGender: "SSML_VOICE_GENDER_UNSPECIFIED"
  },
  audioConfig: {
    audioEncoding: "MP3",
  }
});

// Write the binary audio content to a local file
fs.writeFileSync("output.mp3", response.audioContent as string, "binary");

const audio = new Audic("output.mp3");

await audio.play();