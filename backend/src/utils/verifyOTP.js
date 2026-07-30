import axios from "axios";

export const verifyOTP = async (sessionId, otp) => {
  const apiKey = process.env.TWO_FACTOR_API_KEY;

  const response = await axios.get(
    `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`
  );

  return response.data;
};