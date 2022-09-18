import productsRouter from './routers/products.routers.js'
import authRouter from './routers/auth.routers.js';
import express from 'express';
import cors from 'cors';
import salesRouter from './routers/sales.routers.js';

const server = express();

server.use(cors());
server.use(express.json())

server.use(productsRouter);

server.use(authRouter);

server.use(salesRouter);

server.listen(process.env.PORT, () => console.log(`Listen on http://localhost:${process.env.PORT}`))