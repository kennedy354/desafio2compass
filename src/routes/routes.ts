import express, {Express, Request, Response} from 'express'
import { atualizarTutor, criarTutor, deletarTutor, mostrarTutors } from '../service/tutorService'
import { atualizarPet, criarPet, deletarPet } from '../service/petService'

const router = express.Router()
router.use(express.json())

router.get('/', (req: Request, res: Response) => {res.send('VetClinic'); res.json({message:'teste express'})})

router.post('/tutor', criarTutor, (req: Request, res: Response) => {})

router.get('/tutors', mostrarTutors, (req: Request, res: Response) => {})

router.put('/tutor/:id', atualizarTutor, (req: Request, res: Response) => {})

router.delete('/tutor/:id', deletarTutor, (req: Request, res: Response) => {})

router.post('/pet/:tutorid', criarPet, (req: Request, res: Response) => {})

router.put('/pet/:petid/tutor/:tutorid', atualizarPet, (req: Request, res: Response) => {})

router.delete('/pet/:petid/tutor/:tutorid', deletarPet, (req: Request, res: Response) => {})

export default router