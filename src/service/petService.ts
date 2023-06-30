import express, {Express, Request, Response} from 'express'
import Tutor from '../model/models'
import { v4 as uuidv4 } from 'uuid';

export async function criarPet(req: Request, res: Response){
    
    const id = req.params.tutorid
    const { name, species, category, weight, date_of_birth } = req.body

    const pet = {
        id: uuidv4(),
        name,
        species,
        category,
        weight,
        date_of_birth,
    }

    if(!name || !species || !category || !weight || !date_of_birth){
        res.status(400).json({error: 'Campos obrigatórios faltando'})
        return
    }

    try {
        const tutor = await Tutor.findById(id);
        if (!tutor) {
            res.status(404).json({ error: 'Tutor não encontrado' });
            return;
        }

        tutor.pets.push(pet);
        await tutor.save();

        res.status(201).json({ message: 'Novo pet criado' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}