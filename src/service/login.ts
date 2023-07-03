import express, {Express, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import Tutor from '../model/models'

export async function login (req: Request, res: Response){
    
    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({error: 'Campos obrigatórios faltando'})
        return
    }

    const tutorExistente = await Tutor.findOne({email:email})
    if(!tutorExistente || tutorExistente.password != password){
        res.status(400).json({error: 'Usuário não cadastrado ou Senha incorreta'})
        return
    }

    const id = tutorExistente._id
    const token = jwt.sign({id, email},"jwtSecret",{expiresIn:'1d'})//(1d) é a validade do token, nesse caso vai ser 1 dia
    
    res.status(200).json({msg:"logado",token})
}