import { finderList, finder, insert, upDat } from "../suports/aux.js";

async function getAllProducts(req,res){

    try {

        const list = await finderList('products',{});
        
        res.send(list).status(200) 
    
    } catch (error) {
    
        res.sendStatus(404)
    
    }
}

async function postCartUser(req,res){
    const token = req.headers.authorization.replace('Bearer ', "");
    try {
        const {userId} = await finder('sessions', {token:token});
        
        const valid = await upDat('cartUser', {userId: userId}, {$set:{...req.body}});

        if(valid.matchedCount>0) return res.sendStatus(200);
        
        await insert("cartUser", {userId: userId, ...req.body} )

        res.sendStatus(200);
        
    } catch (error) {

        res.sendStatus(400)
    
    }

}

async function getCartUser(req,res){
    const token = req.headers.authorization.replace('Bearer ', "");
    const {userId} = await finder('sessions', {token:token});
    try {

        const { cont , product}= await finder("cartUser", {userId:userId});

        res.send( {cont:cont,product:product }).status(200)
    } catch (error) {
        res.sendStatus(400)
    }
}


export {getAllProducts, postCartUser, getCartUser} ;