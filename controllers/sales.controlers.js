import db from "../database/db.js";
import nodemailer from "nodemailer";

async function createSale(req, res) {
    const { products } = req.body;
    const {userId, name, email} = res.locals.session;

    const allProduct = products.map((value)=>{ 
        return(
            `<div><div style="width:100%;  margin-left:40%; margin-right:40%; " ><img src="${value.image}" style="  max-width:30%; max-heigth: 30%" /></div>
            <div style=" text-align: center ;" >Nome do produto: ${value.productName}</div><br/>
            <div  style=" text-align: center ;" >Valor da compra: ${(value.price * value.quantity)%1===0 ? `${(value.price * value.quantity)/100}`+",00" : (value.price * value.quantity)/100 }</div> </div>`
             )
            }
        )

    const transporter = nodemailer.createTransport(`smtps://${process.env.MAIL}:${process.env.SENHA_MAIL}@smtp.gmail.com`);
    const mailBuyer = {
        from: process.env.MAIL,
        to: email,
        subject: "Obigado por comprar com a gente",
        text: "Vendido",    
        html: `<div style=" background-color: pink; color: black; font-size:20px ;font-weight:700" >Nome do comprador: ${name}, email: ${email} <br/>${allProduct.join("</br>")}<div/>`,
      };


    transporter.sendMail(mailBuyer, function(error, info){
        if (error) {
          console.log(error);
        }
      });
      const mailSalesman = {
        to: process.env.MAIL,
        from: process.env.MAIL,
        subject: `Comprou com a gente nome:${name} ${email}`,
        text:"Vendido",
        html: `<div style=" background-color: pink; color: black; font-size:20px ;font-weight:700" >Nome do comprador: ${name}, email: ${email} <br/>${allProduct.join("</br>")}<div/>`

      }

      
      transporter.sendMail(mailSalesman, function(error, info){
        if (error) {
          console.log(error);
        }
      });
             

    try {
        
        await db.collection("sales").insertOne({
            userId: userId,
            name: name,
            email: email,
            products,
        });

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export { createSale };