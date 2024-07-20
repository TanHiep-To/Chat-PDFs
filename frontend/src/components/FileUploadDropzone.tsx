// "use client";

// import { useState } from "react";

// import axios from "axios";
// import { FileText, Loader2, UploadCloud } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Dropzone from "react-dropzone";

// import {
//   DROPDOWN_ACCEPTED_FILE_TYPES,
//   SERVER_API_URL,
//   SUBSCRIBED_USER_FILE_SIZE,
//   UNSUBSCRIBED_USER_FILE_SIZE,
// } from "@/libs/config/const";

// import { useUploadThing } from "@/libs/config/uploadthing";

// const FileUploadDropzone = () => {
//   const router = useRouter();
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [isUploading, setIsUploading] = useState<boolean>(false);

//   const { startUpload } = useUploadThing("pdfUploader");

//   // Create an object of Accept type for Dropzone to understand.
//   const acceptFileTypes = () => {
//     const resultObject: { [key: string]: string[] } = {};
//     DROPDOWN_ACCEPTED_FILE_TYPES.forEach((fileType) => {
//       const [key] = Object.keys(fileType);
//       const [value] = Object.values(fileType);
//       resultObject[key] = value;
//     });
//     return resultObject;
//   };

//   console.log("this is the accepted file types", acceptFileTypes());

//   return (
//     <Dropzone
//       multiple={false}
//       accept={acceptFileTypes()}
//       onDrop={async (acceptedFile: any) => {
//         setIsUploading(true);
//         const uploadResponse = await startUpload(acceptedFile);
//         if (!uploadResponse) {
//           setIsUploading(false);
//           console.log("this is the error with the upload response");
//           return "this is the error with the upload response";
//         }
//         console.log("this is the upload response", uploadResponse);

//         const [fileUploadResponse] = uploadResponse;
//         const key = fileUploadResponse?.key;
//         if (!key) {
//           setIsUploading(false);
//           console.log("this is the error with the upload key");

//           return "this is the error with the upload key";
//         }

//         try {
//           const payload = { key };
//           const response = await axios.post(
//             `${SERVER_API_URL}/uploadthing`,
//             payload
//           );
//           if (response.status === 200) {
//             router.push(`/dashboard/${response.data.id}`);
//           }
//         } catch (error) {
//           console.log("this is the error with the upload key");
//           return "this is the error with the upload key";
//         }
//       }}
//     >
//       {({ getRootProps, getInputProps, acceptedFiles }) => (
//         <div
//           {...getRootProps()}
//           className="m-4 h-64 rounded-lg border border-dashed border-gray-300"
//         >
//           <div className="flex h-full w-full items-center justify-center">
//             <label
//               htmlFor="dropzone-file"
//               className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
//             >
//               <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                 <UploadCloud className="mb-2 h-8 w-8 text-zinc-500" />
//                 <p className="mb-2 text-sm text-zinc-700">
//                   <span className="font-semibold">Click to upload</span> or{" "}
//                   <span className="font-light">drag and drop</span>
//                 </p>
//                 <p className="text-xs text-zinc-500">
//                   PDF (up to{" "}
//                   <span className="font-semibold">
//                     {true
//                       ? SUBSCRIBED_USER_FILE_SIZE
//                       : UNSUBSCRIBED_USER_FILE_SIZE}
//                     MB
//                   </span>
//                   )
//                 </p>
//               </div>
//               {acceptedFiles && acceptedFiles[0] ? (
//                 <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
//                   <div className="grid h-full place-items-center px-3 py-2">
//                     <FileText className="h-4 w-4 text-blue-500" />
//                   </div>
//                   <div className="h-full truncate px-3 py-2 text-sm">
//                     {acceptedFiles[0].name}
//                   </div>
//                 </div>
//               ) : null}

//               <input
//                 {...getInputProps()}
//                 type="file"
//                 id="dropzone-pdf"
//                 className="hidden"
//               />

//               {isUploading ? (
//                 <div className="mx-auto mt-4 w-full max-w-xs">
//                   <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
//                     <Loader2 className="h-3 w-3 animate-spin text-primary" />
//                     Redirecting...🚀
//                   </div>
//                 </div>
//               ) : null}
//             </label>
//           </div>
//         </div>
//       )}
//     </Dropzone>
//   );
// };

// export default FileUploadDropzone;
