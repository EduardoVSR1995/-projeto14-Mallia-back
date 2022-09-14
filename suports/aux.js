import dbs from '../db/db.js'

let db = await dbs()

async function finderList(local, obj){
    try {

        const list = await db.collection(local).find(obj).toArray();
        return list;
    } catch (error) {
        return res.sendStatus(error)
    }
}

export {finderList};
