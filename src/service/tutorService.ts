import express, {Express, Request, Response} from 'express'
import Tutor from '../model/models'

export async function criarTutor (req: Request, res: Response) {
    
    const {name, password, phone, email, date_of_birth, zip_code, pets} = req.body

    const tutor = {
        name,
        password,
        phone,
        email,
        date_of_birth,
        zip_code,
        pets
    }

    const tutorExistente = await Tutor.findOne({email:email})
    if (tutorExistente){
        res.status(400).json({message: 'Email já Cadastrado'})
        return
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
        const tutors = await Tutor.find().select("-password")
        res.status(200).json(tutors)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export async function atualizarTutor(req: Request, res: Response){
    const id = req.params.id
    //console.log(req.user) //usar variaves do middleware

    const {name, phone, email, date_of_birth, zip_code} = req.body

    const tutor = {
        name,
        phone,
        email,
        date_of_birth,
        zip_code
    }

    if(!name || !phone || !email || !date_of_birth || !zip_code){
        res.status(400).json({error: 'Campos obrigatórios faltando'})
        return
    }

    try {
        await Tutor.updateOne({_id: id}, tutor)
        res.status(200).json(tutor)
    } catch (error) {
        res.status(404).json({ message: 'Tutor não encontrado' })
        return
    }
}

export async function deletarTutor(req: Request, res: Response) {
    const id = req.params.id
  
    try {
        const tutor = await Tutor.findById(id)
        if (!tutor) {
            res.status(404).json({ message: 'Tutor não encontrado' })
            return
        }
  
        if (tutor.pets.length > 0) {
            res.status(400).json({ message: 'O tutor só pode ser deletado quando não tiver nenhum pet' })
            return
        }
  
        await Tutor.deleteOne({ _id: id })
        res.status(204).json({ message: 'Tutor deletado' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tutor' })
    }
  }