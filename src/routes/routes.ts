import express, {Express, Request, Response} from 'express'
import { atualizarTutor, criarTutor, deletarTutor, mostrarTutors } from '../service/tutorService'
import { atualizarPet, criarPet, deletarPet } from '../service/petService'
import { login } from '../service/login'
import autenticar from '../middleware/auth'

const router = express.Router()
router.use(express.json())

router.get('/', (req: Request, res: Response) => {res.send('VetClinic'); res.json({message:'teste express'})})

router.post('/tutor', criarTutor, (req: Request, res: Response) => {})

router.route('/tutors').get(autenticar, mostrarTutors)

router.route('/tutor/:id').put(autenticar, atualizarTutor)

router.route('/tutor/:id').delete(autenticar, deletarTutor)

router.route('/pet/:tutorid').post(autenticar, criarPet)

router.route('/pet/:petid/tutor/:tutorid').put(autenticar, atualizarPet)

router.route('/pet/:petid/tutor/:tutorid').delete(autenticar, deletarPet)

router.post('/auth', login, (req: Request, res: Response) => {})

export default router