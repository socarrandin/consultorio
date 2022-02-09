import conectarDB from 'lib/dbConnect'
import Poblacion from 'models/Poblacion'

export default async function handler(req, res){

    await conectarDB()

    // GET api/enfermedad/id_poblacion

    const {method, query: {id}} = req
    switch (method) {
        case 'PUT':
            try {
            const poblacion = await Poblacion.findByIdAndUpdate(
                id,
                req.body,
                {
                    new:true,
                    runValidators: true
                }
                ).lean()
            if(!poblacion){
                return res.status(404).json({success: false })
            }
            return res.json({success: true, data:"Se actualizó correctamente población" })
            } catch (error) {
                return res.status(404).json({success: false, error })
            }
            
        default:
            return res
            .status(500)
            .json({success: false, error: 'Falla de servidor'});
    } 

}