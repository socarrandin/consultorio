import mongoose from 'mongoose'

const HojaCargoSchema = new mongoose.Schema({
    historia_clinica: {
        type: String,
        required: [true, "Por favor ingrese en No. Historia Clínica"],
    },
    poblacion: {
        type: mongoose.Types.ObjectId,
        ref: 'Poblacion',       
        required: [true, "Por favor selecione paciente de población"],
    },
    problema_salud: {
        type: String,
        required: [true, "Por favor escriba el Problema de Salud"],
    },
    intervension: {
        type: String,
        required: [true, "Por favor Selecione la intervensión"],
    },
    conducta: {
        type: String,
        required: [true, "Por favor escriba la Conducta"],
    },     
    fecha: {
        type: Date,
        required: [true, "Por favor selecione la fecha"],
    },

})

export default mongoose.models.HojaCargo || mongoose.model('HojaCargo', HojaCargoSchema)