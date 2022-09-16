import express from "express";
import { createSale } from "../controllers/sales.controlers.js";
import authorizationValidation from "../middlewares/authValidation.js";

const salesRouter = express.Router();

salesRouter.post("/cheCkout", authorizationValidation,  createSale);

export default salesRouter;