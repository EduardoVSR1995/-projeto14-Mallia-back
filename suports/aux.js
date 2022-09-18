import db from '../database/db.js'

async function finderList(local, obj){
    try {     

        const list = await db.collection(local).find(obj).toArray();
        return list;
    } catch (error) {
        return error
    }
}

async function finder(local, obj){
    try {     
        const user = await db.collection(local).findOne(obj);
        return user;
    } catch (error) {
        return error
    }
}

async function upDat(local, localizer, up){
    try {
        const obj = await db.collection(local).findOne(localizer, up);
        return obj ;    
    } catch (error) {
        return error       
    }
}

export {finderList, finder, upDat };

