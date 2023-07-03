import { NextFunction,RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

const autenticar: RequestHandler = (req, res, next) => {
    //console.log(req.headers)
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({error: 'Sem Token'})
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,"jwtSecret")
        //Usar variaves do token em outras funções
        //const {id, email} = decoded
        //req.user = {id, email}
        //console.log(decoded.id)
        next()
    } catch (error) {
        res.status(401).json({error: 'Sem autorização'})
    }
}

export default autenticar