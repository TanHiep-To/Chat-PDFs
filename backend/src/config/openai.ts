import OpenAI from "openai";
import { OPENAI_API_KEY } from "./const";

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
