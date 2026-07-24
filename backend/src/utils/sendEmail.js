import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendOTP = async (email, otp) => {

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Library Email Verification",

        html: `
            <h2>Smart Library Management</h2>

            <p>Your OTP is</p>

            <h1>${otp}</h1>

            <p>This OTP expires in 5 minutes.</p>
        `
    });

};

export default sendOTP;