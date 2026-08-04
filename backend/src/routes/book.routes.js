import express from "express";
import {protect} from "../middlewares/auth.middleware.js";
import {authorize} from "../middlewares/role.middleware.js";
import { getBooks, createBooks, getNewArrivals } from "../controllers/book.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get('/', getBooks)
router.post("/", upload.single("image"), createBooks);

router.get('/new-arrivals', getNewArrivals )

export default router;