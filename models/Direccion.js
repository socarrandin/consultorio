import mongoose from "mongoose"

const DireccionSchema = new mongoose.Schema({    
    calle: {
        type: String,
        required: [true, "Por favor ingrese la dirección"],
    }     


})

export default mongoose.models.Direccion || mongoose.model('Direccion', DireccionSchema)