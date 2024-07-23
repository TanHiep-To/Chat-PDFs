import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_API_KEY, PINECONE_ENVIRONMENT } from "./const";

export const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY!,
  // environment: PINECONE_ENVIRONMENT!,
});
