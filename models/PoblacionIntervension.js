import mongoose from 'mongoose'

const PoblacionIntervensionSchema = new mongoose.Schema({
    intervension: {
        type: mongoose.Types.ObjectId,
        ref: 'Intervension',
        required: true
    },
    poblacion: {
        type: mongoose.Types.ObjectId,
        ref: 'Poblacion',
        required: true
    },
    fecha: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.models.PoblacionIntervension || mongoose.model('PoblacionIntervension', PoblacionIntervensionSchema)