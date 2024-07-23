import { getProfile } from "@/app/dashboard/actions";
import axios from "axios";
import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const cookieStore = cookies();
      if (!cookieStore.get("token")) throw new UploadThingError("Unauthorized");

      const token: string = cookieStore.get("token")!.value;
      console.log("token", token);
      const user = await getProfile(token);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return user;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata!.id);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata!.id };
    }),

  pdfUploader: f({ pdf: { maxFileSize: "32MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const cookieStore = cookies();
      if (!cookieStore.get("token")) throw new UploadThingError("Unauthorized");

      const token: string = cookieStore.get("token")!.value;
      console.log("token", token);

      const user = await getProfile(token);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { user, token };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.user.id);
      console.log("file url", file.url);

      const response = await axios.post(
        "http://localhost:8000/files",
        {
          name: file.name,
          key: file.key,
          size: file.size,
          type: "PDF",
        },
        {
          headers: {
            Authorization: `Bearer ${metadata.token}`,
          },
        }
      );

      const data = response.data;

      console.log("data", data);

      return { uploadedBy: metadata.user.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
