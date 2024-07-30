import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USERNAME } from "./const";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  service: "gmail",
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

export default transporter;
