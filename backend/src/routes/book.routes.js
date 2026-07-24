import express from "express";
import {protect} from "../middlewares/auth.middleware.js";
import {authorize} from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("admin","librarian"),
  (req,res) => {
    res.json({
      message: "Welcome Admin & librarian"
    })
  }
)

export default router;