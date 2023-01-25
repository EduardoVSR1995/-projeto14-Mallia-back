import { getAllProducts ,postCartUser, getCartUser } from "../controllers/products.controlers.js";
import { validHeader } from '../middlewares/autorization.middlewares.js';
import express from 'express'

const router = express.Router()

router.get('/products',validHeader , getAllProducts);

router.post('/cartUser', validHeader, postCartUser)

router.get('/cartUser', validHeader, getCartUser)


export default router ;