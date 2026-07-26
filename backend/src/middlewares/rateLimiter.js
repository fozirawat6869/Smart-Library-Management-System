import { rateLimit } from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes

  max: 3, // only 5 login attempts

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again after 5 minutes.",
  },

});


