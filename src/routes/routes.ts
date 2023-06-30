import express, {Express, Request, Response} from 'express'
import { atualizarPet, deletarPet} from '../controller/controller'

import { atualizarTutor, criarTutor, deletarTutor, mostrarTutors } from '../service/tutorService'
import { criarPet } from '../service/petService'

const router = express.Router()
router.use(express.json())

router.get('/', (req: Request, res: Response) => {res.send('VetClinic'); res.json({message:'teste express'})})

router.post('/tutor', criarTutor, (req: Request, res: Response) => {})

router.get('/tutors', mostrarTutors, (req: Request, res: Response) => {})

router.put('/tutor/:id', atualizarTutor, (req: Request, res: Response) => {})

router.delete('/tutor/:id', deletarTutor, (req: Request, res: Response) => {})

router.post('/pet/:tutorid', criarPet, (req: Request, res: Response) => {})
 
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