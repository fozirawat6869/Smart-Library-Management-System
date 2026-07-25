import express from "express";
import {protect} from "../middlewares/auth.middleware.js";
import {authorize} from "../middlewares/role.middleware.js";
import { getBooks, createBooks } from "../controllers/book.controller.js";

const router = express.Router();

router.get('/', getBooks)
router.post('/', createBooks)


export default router;