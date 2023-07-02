import express, {Express, Request, Response} from 'express'
import Tutor from '../model/models'
import { v4 as uuidv4 } from 'uuid'

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
        const tutor = await Tutor.findById(id)
        if (!tutor) {
            res.status(404).json({ error: 'Tutor não encontrado' })
            return
        }

        tutor.pets.push(pet)
        await tutor.save()

        res.status(201).json({ message: 'Pet criado' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function atualizarPet(req: Request, res: Response){
    
    const idT = req.params.tutorid
    const idP = req.params.petid

    const { name, species, category, weight, date_of_birth } = req.body

    if(!name || !species || !category || !weight || !date_of_birth){
        res.status(400).json({error: 'Campos obrigatórios faltando'})
        return
    }

    try {
        const tutor = await Tutor.findById(idT)
        if (!tutor) {
          res.status(404).json({ error: 'Tutor não encontrado' })
          return
        }
    
        const pet = tutor.pets.find((petAtt) => petAtt.id === idP)
        if (!pet) {
          res.status(404).json({ error: 'Pet não encontrado' })
          return
        }

        pet.name = name
        pet.species = species
        pet.category = category
        pet.weight = weight
        pet.date_of_birth = date_of_birth

        tutor.markModified('pets')
    
        await tutor.save()
    
        res.status(200).json({ message: 'Pet atualizado' })
      } catch (error) {
        res.status(500).json({ error: error })
      }
}

export async function deletarPet(req: Request, res: Response) {
    const idT = req.params.tutorid
    const idP = req.params.petid
  
    try {
      const tutor = await Tutor.findById(idT)
      if (!tutor) {
        res.status(404).json({ error: 'Tutor não encontrado' })
        return
      }
  
      const petIndex = tutor.pets.findIndex((pet) => pet.id === idP)
      if (petIndex === -1) {
        res.status(404).json({ error: 'Pet não encontrado' })
        return
      }
  
      tutor.pets.splice(petIndex, 1)
  
      tutor.markModified('pets')
  
      await tutor.save()
  
      res.status(204).json({ message: 'Pet deletado' })
    } catch (error) {
      res.status(500).json({ error: error })
    }
}