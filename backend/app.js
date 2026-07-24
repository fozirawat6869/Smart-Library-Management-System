import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import bookRoutes from "./src/routes/book.routes.js";

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);  

export default app;