import productsRouter from './routers/products.routers.js'
import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json())

server.use(productsRouter);

server.listen(5000)