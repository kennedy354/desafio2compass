import express, {Express, Request, Response} from 'express'
import { atualizarPet, atualizarTutor, criarPet, deletarPet, deletarTutor} from '../controller/controller'

import { criarTutor, mostrarTutors } from '../service/tutorService'

const router = express.Router()
router.use(express.json())

//Home
router.get('/', (req: Request, res: Response) => {
    res.send('VetClinic')
    res.json({message:'teste express'})
})

//Mostrar todos os Tutors
router.get('/tutors', mostrarTutors, (req: Request, res: Response) => {})

//Criar novo Tutor
router.post('/tutor', criarTutor, (req: Request, res: Response) => {})

//Atualizar Tutor
router.put('/tutor/:id', (req: Request, res: Response) => {
    const {id}:any = req.params
    atualizarTutor(id, req, res)
})

//Deletar Tutor
router.delete('/tutor/:id', (req: Request, res: Response) => {
    const {id}:any = req.params
    deletarTutor(id, req, res)
})

//Criar novo Pet para um Tutor
router.post('/pet/:tutorid', (req: Request, res: Response) => {
    const {tutorid}:any = req.params
    criarPet(tutorid, req, res)
})

//Atualizar Pet
router.put('/pet/:petid/tutor/:tutorid', (req: Request, res: Response) => {
    const {petid}:any = req.params
    const {tutorid}:any = req.params
    atualizarPet(petid, tutorid, req, res)
})

//Deletar Pet
router.delete('/pet/:petid/tutor/:tutorid', (req: Request, res: Response) => {
    const {petid}:any = req.params
    const {tutorid}:any = req.params
    deletarPet(petid, tutorid, req, res)
})

export default router