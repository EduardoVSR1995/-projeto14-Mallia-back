import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();


export default async function mongodb(){
    const mongoClient = new MongoClient(process.env.SERVER_URI);

    let db;

    try {
        db = await mongoClient.db('');
        return db;
    } catch (error) {
        return error;        
    }

}
