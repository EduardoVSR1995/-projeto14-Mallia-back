import { signUp, signIn, validToken } from "../controllers/auth.controlers.js";
import userSchemaValidation from "../middlewares/userSchemaValidation.js";
import { validHeader } from "../middlewares/autorization.middlewares.js";
import { timeDel } from "../suports/aux.js"
import express from "express";

const authRouter = express.Router();

setInterval(timeDel, 60000)

authRouter.post("/register", userSchemaValidation, signUp);

authRouter.post("/signIn", signIn);

authRouter.get('/sessions', validHeader, validToken)


export default authRouter;