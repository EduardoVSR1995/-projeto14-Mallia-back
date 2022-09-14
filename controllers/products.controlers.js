import { finderList } from "../suports/aux.js";

async function getAllProducts(req,res){
    console.log(res.locals)
    try {
        const list = await finderList('products',{});
        console.log(list)
        return res.send(list).status(200)    
    } catch (error) {
        res.sendStatus(404)
    }
} 






export {getAllProducts} ;