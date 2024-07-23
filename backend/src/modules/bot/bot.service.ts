// const storeEmbeddingsInPinecone = (
//   pageLevelDocs,
//   embeddings,
//   fileId,
//   userId
// ) => {
//   pageLevelDocs;
//   // Create an array of objects with the embeddings and additional metadata
//   const idsWithMetadata = embeddings.map((embedding, index) => {
//     return {
//       id: `file-${fileId}-doc-${index}`, // Create a unique ID for each embedding
//       values: embedding,
//       metadata: {
//         fileId: fileId,
//         userId: userId,
//       },
//     };
//   });

//   // Store the embeddings and metadata in Pinecone
//   await pineconeIndex.upsert({ vectors: idsWithMetadata });
// };
