import axios from "axios";

export const sendOTP = async (phone) => {
  try {
    const apiKey = process.env.TWO_FACTOR_API_KEY;

    const response = await axios.get(
      `https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN`
    );

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Failed to send OTP");
  }
};