import db from "../database/db.js";

async function createSale(req, res) {
    const { products } = req.body;

    try {
        const session = res.locals.session;

        await db.collection("sales").insertOne({
            userId: session.userId,
            name: session.name,
            email: session.email,
            products,
        });

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

export { createSale };