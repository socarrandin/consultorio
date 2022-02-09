import mongoose from 'mongoose'

const PoblacionEnfermedadSchema = new mongoose.Schema({
    enfermedadId: {
        type: ObjectId,        
        required: [true, "Por favor ingrese el ID de la enfermedad"],
    },
    poblacionId: {
        type: ObjectId,        
        required: [true, "Por favor ingrese el ID de la población"],
    },
    fecha: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.models.PoblacionEnfermedad || mongoose.model('PoblacionEnfermedad', PoblacionEnfermedadSchema)