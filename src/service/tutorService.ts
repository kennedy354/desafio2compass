import express, {Express, Request, Response} from 'express'
import Tutor from '../model/tutors'

export async function criarTutor (req: Request, res: Response) {
    
    const {name, phone, email, date_of_birth, zip_code, pets} = req.body

    const tutor = {
        name,
        phone,
        email,
        date_of_birth,
        zip_code,
        pets
    }

    try{

        await Tutor.create(tutor)

        res.status(201).json({message: 'Sucesso'})

    } catch(error){
        res.status(500).json({error: error})
    }
}

export async function mostrarTutors(req: Request, res: Response){

    try {
        const tutors = await Tutor.find()

        res.status(200).json(tutors)
    } catch (error) {
        res.status(500).json({error: error})
    }
}