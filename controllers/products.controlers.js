import { finderList } from "../suports/aux.js";

async function getAllProducts(req,res){
    try {

        const list = await finderList('products',{});
        
        return res.send(list).status(200)    
    
    } catch (error) {
    
        res.sendStatus(404)
    
    }
}

export {getAllProducts} ;