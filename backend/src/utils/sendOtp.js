import { Resend } from "resend";

import dotenv from "dotenv";
dotenv.config();

console.log("Resend API Key:", process.env.RESEND_API_KEY); // Log the API key to verify it's being read correctly



const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (email, otp) => {
 
};

