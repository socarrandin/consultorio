import mongoose from 'mongoose'

const ConsultorioMedicoSchema =  new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, "Por favor ingrese el nombre del consultorio"],
    },
    numero: {
        type: String,
        unique: true,
        required: [true, "Por favor ingrese el número del consultorio"],
    },

})

export default mongoose.models.ConsultorioMedico || mongoose.model('ConsultorioMedico', ConsultorioMedicoSchema)