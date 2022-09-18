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
        const obj = await db.collection(local).updateOne(localizer, up);
        return obj ;    
    } catch (error) {
        return error       
    }
}

async function dell(local, localizer){
    try {
        const obj = await db.collection(local).deleteOne(localizer);
        return obj ;    
    } catch (error) {
        return error       
    }
}


async function timeDel(){
    const time = Date.now();

    try {

        const list = await finderList('sessions', {})
        
        list.map(async(value)=>{if( Number(Date.now() - value.lastStatus) > 3600000 ){

        await dell('sessions', {_id: value._id})} })

        
    } catch (error) {
        
    }


}

export {finderList, finder, upDat, timeDel, dell };

