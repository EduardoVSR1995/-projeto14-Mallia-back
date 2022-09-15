import db from '../database/db.js'

async function finderList(local, obj){
    try {     

        const list = await db.collection(local).find(obj).toArray();
        return list;
    } catch (error) {
        return res.sendStatus(error)
    }
}

export {finderList};

