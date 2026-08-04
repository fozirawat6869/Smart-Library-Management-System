import { getAllUsers } from "../controllers/admin.controller.js";
import express from "express";

const router = express.Router();

// get all users
router.get("/", getAllUsers);

export default router;
