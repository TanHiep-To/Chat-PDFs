import transporter from "../config/mail";

const verificationMailTemplate = (code: string) => {
  return `
  <div>
  <h1>Verify your account</h1>
  <p>Your verification code is: <strong>${code}</strong></p>
  <p>This code will expire in 10 minutes</p>
  <p>Thanks</p>
  <p>Love Cook</p>
  </div>
  `;
};

export const sendMail = async (
  email: string,
  mailType: string,
  content: string
) => {
  try {
    let subject = "";
    let html = "";
    if (mailType === "verification") {
      subject = "Verify your account";
      html = verificationMailTemplate(content);
    }
    // } else if (mailType === "resetPassword") {
    //   subject = "Reset your password";
    //   html = resetPasswordMailTemplate(content);
    // } else if (mailType === "feedback") {
    //   subject = "Feedback";
    //   html = feedBackTemplate(content);
    // } else if (mailType === "adminResetPassword") {
    //   subject = "Admin has reset your password";
    //   html = adminResetPasswordMailTemplate();
    // } else if (mailType === "adminChangePassword") {
    //   subject = "Admin has change your password";
    //   html = adminChangePasswordMailTemplate(content);
    // } else if (mailType === "adminDeleteAccount") {
    //   subject = "Admin has delete your account";
    //   html = adminDeleteAccountMailTemplate();
    // }

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: subject,
      html: html,
    });
    console.log("email sent successfully");
    return true;
  } catch (error) {
    console.log("email not sent!");
    console.log("user: ", process.env.USER);
    console.log("pass: ", process.env.PASS);
    console.log(error);
    return false;
  }
};
