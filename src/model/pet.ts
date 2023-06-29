import mongoose,{Schema, Document} from 'mongoose'

export interface sPet extends Document{
    name: string
    species: string
    category: string
    weight: number
    date_of_birth: Date
}

const PetSchema = new Schema<sPet>({
    name: String,
    species: String,
    category: String,
    weight: Number,
    date_of_birth: Date
})

const Pet = mongoose.model<sPet>('Pet', PetSchema)

export default Pet