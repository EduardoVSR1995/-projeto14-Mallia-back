import joi from 'joi';

const paramSchema =  joi.object({
    authorization:joi.string().required(),
})

function validHeader(req, res, next){
    console.log(req.headers.authorization)

    const authorization = {authorization: req.headers.authorization};
    const validate = paramSchema.validate(authorization)

    if(validate.error) {
        const list = validate.error.details.map((value) => value.message);
        return res.status(412).send(list);
    }
    res.locals.authorization = authorization.authorization;
    next();
}


export {validHeader};