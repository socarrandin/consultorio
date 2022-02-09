import mongoose from 'mongoose'

const EnfermedadSchema = new mongoose.Schema({
    enfermedad: {
        type: String,
        unique: true,
        required: [true, "Por favor ingrese la enfermedad"],
    }
})

export default mongoose.models.Enfermedad || mongoose.model('Enfermedad', EnfermedadSchema)