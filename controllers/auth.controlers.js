import {finder, upDat} from '../suports/aux.js'
import db from "../database/db.js";
import { v4 as uuid } from 'uuid';
import bcrypt from "bcrypt";

async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (user) {
            return res.status(409).send("Email já está em uso");
        };        

        const passwordHash = bcrypt.hashSync(password, 10);

        const obj = await db.collection("users").insertOne({
            name,
            email,
            password: passwordHash
        });

        const token = uuid();

        const session = {
            userId: obj.insertedId,
            token: token,
            email,
            name,
            lastStatus: Date.now()
        };

        await db.collection("sessions").insertOne(session);
            
        delete session.lastStatus;
        
        delete session.userId;
            
        res.send(session).status(201);
        } catch (error) {
       return res.send(error.message).status(500);
    };
};

async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const user = await db.collection("users").findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            const session = {
                userId: user._id,
                token: token,
                email,
                name: user.name,
                lastStatus: Date.now()
            };

            await db.collection("sessions").insertOne(session);
            
            delete session.lastStatus;

            delete session.userId;

            res.status(201).send(session);
        } else {
            res.status(401).send("Usuário não encontrado, login ou senha incorretos");
        };
    } catch (error) {
       return res.status(500).send(error.message);
    };
};

async function validToken(req, res) {
    const token = req.headers.authorization.replace('Bearer ', "");

    try {
        await upDat('sessions', {token: token}, {$set:{lastStatus: Date.now()}} )
    
        const user = await finder('sessions', {token: token})
    
        delete user.lastStatus;

        if(user)return res.send(user).status(201);
    
        return res.sendStatus(401);        

    } catch (error) {

        return res.sendStatus(401);        
        
    }    
}

export { signUp, signIn, validToken };







