import { Schema } from '@mui/icons-material'
import mongoose from 'mongoose'

const PoblacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre"],
    },
    apellidos: {
        type: String,
        required: [true, "Por favor ingrese los apellidos"],
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, "Por favor selecione la fecha de nacimiento"],
    },
    sexo: {
        type: String,
        required: [true, "Por favor selecione el sexo"],
    },
    ci: {
        type: String,
        unique: true,
        maxlength: [11, "CI es de 11 digito"],
        minlength: [11, "CI es de 11 digito"],
        required: [true, "Por favor ingrese el carné de identidad"],
    },
    no_vivienda: {
        type: String,
        required: [true, "Por favor ingrese el número de la casa"],
    },
    no_nucleo: {
        type: String,
        required: [true, "Por favor ingrese el número del núcleo"],
    },
    calle: {
        type: mongoose.Types.ObjectId,
        ref: 'Direccion',
    },
    consultorio: {
        type: mongoose.Types.ObjectId,
        ref: 'ConsultorioMedico'
    },
    enfermedads: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Enfermedad'
        }
    ],
    intervensions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'PoblacionIntervension'
        }
    ],
    fecha_hojacargo: {
        type: Date,
        default: null
    }   

})

export default mongoose.models.Poblacion || mongoose.model('Poblacion', PoblacionSchema)