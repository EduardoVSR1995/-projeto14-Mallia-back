import { signUp, signIn, validToken } from "../controllers/auth.controlers.js";
import userSchemaValidation from "../middlewares/userSchemaValidation.js";
import { validHeader } from "../middlewares/autorization.middlewares.js";
import express from "express";

const authRouter = express.Router();

authRouter.post(
    "/register",
    userSchemaValidation,
    signUp
);

authRouter.post("/signIn", signIn);

authRouter.get('/sessions', validHeader,validToken)

export default authRouter;