import productsRouter from './routers/products.routers.js';
import salesRouter from './routers/sales.routers.js';
import authRouter from './routers/auth.routers.js';
import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json())

server.use(authRouter);

server.use(salesRouter);

server.use(productsRouter);

server.listen(process.env.PORT, () => console.log(`Listen on http://localhost:${process.env.PORT}`))