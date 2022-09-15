// import productsRouter from './routers/products.routers.js'
import express from 'express';
import cors from 'cors';
import authRouter from './routers/auth.routers.js';

const server = express();

server.use(cors());
server.use(express.json())

// server.use(productsRouter);
server.use(authRouter)

server.listen(5000, () => console.log("Listen on http://localhost:5000"))