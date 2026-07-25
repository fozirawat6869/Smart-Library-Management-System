  import express from "express";
  import { getCategories,
    createCategory
  } from "../controllers/category.controller.js";
import { adminOnly } from "../middlewares/adminOnly.js";

  const router = express.Router();

  router.get('/',adminOnly,getCategories);
  router.post('/',adminOnly, createCategory)

  export default router;