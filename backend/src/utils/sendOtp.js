import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (email, otp) => {
  await resend.emails.send({
    from: "Library <onboarding@resend.dev>",
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>Smart Library Management</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });
};