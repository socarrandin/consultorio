import mongoose from 'mongoose'

const IntervensionSchema = new mongoose.Schema({
    intervension: {
        type: String,
        unique: true,
        required: [true, "Por favor ingrese la interversion"],
    }
})

export default mongoose.models.Intervension || mongoose.model('Intervension', IntervensionSchema)