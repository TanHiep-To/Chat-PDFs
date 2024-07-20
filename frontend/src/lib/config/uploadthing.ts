import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UPLOADTHING_APP_ID, UPLOADTHING_SECRET } from "./const";

export const routeHandlerConfig = {
  uploadthingId: UPLOADTHING_APP_ID,
  uploadthingSecret: UPLOADTHING_SECRET,
};
