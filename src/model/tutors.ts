import mongoose,{Schema, Document} from 'mongoose'
import Pet, {sPet} from './pet'

interface sTutor extends Document{
    name: string
    phone: string
    email: string
    date_of_birth: Date
    zip_code: string;
    pets: sPet[];
}

const TutorSchema = new Schema<sTutor>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    zip_code: { type: String, required: true },
    pets: { type: [Schema.Types.ObjectId], required: true },
  });

const Tutor = mongoose.model<sTutor>('Tutor', TutorSchema);

export default Tutor