import express from "express";
import { verifyJWT, requireAdmin } from "../middlewares/auth.middleware.js";
import { adminLogin, adminLogout, getAllUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", verifyJWT, requireAdmin, adminLogout);
router.get("/users", verifyJWT, requireAdmin, getAllUsers);

export default router;
