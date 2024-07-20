// import { createUploadthing, type FileRouter } from "uploadthing/express";
// import { UPLOADTHING_APP_ID, UPLOADTHING_SECRET } from "./const";
// import { Request, Response } from "express";

// const f = createUploadthing();

// export const uploadRouter = {
//   imageUploader: f({
//     image: {
//       maxFileSize: "4MB",
//       maxFileCount: 4,
//     },
//   }).onUploadComplete((data) => {
//     console.log("upload img completed", data);
//   }),

//   pdfUploader: f({
//     pdf: {
//       maxFileSize: "8MB",
//       maxFileCount: 1,
//     },
//   })
//     .middleware(async ({ req, res }) => {
//       req;
//       res;
//       console.log("pdf upload middleware");
//       return { data: "pdf upload middleware" };
//     })
//     .onUploadComplete((data) => {
//       console.log("upload file completed", data);
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof uploadRouter;

// export const routeHandlerConfig = {
//   uploadthingId: UPLOADTHING_APP_ID,
//   uploadthingSecret: UPLOADTHING_SECRET,
// };
