import dotenv from "dotenv";
dotenv.config();

export const SERVER_API_URL =
  process.env.SERVER_API_URL || "http://localhost:8000";

export const SUBSCRIBED_USER_FILE_SIZE = 15; // 15 MB
export const UNSUBSCRIBED_USER_FILE_SIZE = 5; // 5 MB
export const INFINITE_QUERY_LIMIT = 10;
export const PAID_PLAN_PRICE = 10; // In USD

export const UPLOADTHING_SECRET = process.env.UPLOADTHING_SECRET;
export const UPLOADTHING_APP_ID = process.env.UPLOADTHING_APP_ID;
export const DROPDOWN_ACCEPTED_FILE_TYPES = [
  {
    "application/pdf": [".pdf"],
  },
  // {
  //   ["image/*"]: ".jpeg, .jpg, .png",
  // },
];

export enum UploadStatus {
  UPLOADED = "UPLOADED",
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILURE = "FAILURE",
  PROCESSING = "PROCESSING",
}

export const UploadStatuses = [
  {
    value: UploadStatus.UPLOADED,
    label: "Uploaded",
  },
  {
    value: UploadStatus.SUCCESS,
    label: "Success",
  },
  {
    value: UploadStatus.PENDING,
    label: "Pending",
  },
  {
    value: UploadStatus.FAILURE,
    label: "Failure",
  },
  {
    value: UploadStatus.PROCESSING,
    label: "Processing",
  },
];
