import { getAllProducts } from "../controllers/products.controlers.js";
import { validHeader } from '../middlewares/autorization.middlewares.js';
import express from 'express'

const router = express.Router()

router.get('/products', validHeader, getAllProducts)

export default router ;