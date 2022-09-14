import express from "express";
import { signUp, signIn } from "../controllers/auth.controlers.js";
import userSchemaValidation from "../middlewares/userSchemaValidation.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    userSchemaValidation,
    signUp
);

authRouter.post("/signIn", signIn);

export default authRouter;