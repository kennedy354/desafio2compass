import mongoose,{Schema, Document} from 'mongoose'

interface Pet {
  name: string
  species: string
  category: string
  weight: number
  date_of_birth: Date
}

interface sTutor extends Document{
  name: string
  phone: string
  email: string
  date_of_birth: Date
  zip_code: string
  pets: Pet[]
}

const TutorSchema = new Schema<sTutor>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  zip_code: { type: String, required: true },
  pets: { type: [{ type: Schema.Types.Mixed }] as any, default: [] }
})

const Tutor = mongoose.model<sTutor>('Tutor', TutorSchema);

export default Tutor