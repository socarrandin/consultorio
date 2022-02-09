import conectarDB from 'lib/dbConnect'
import HojaCargo from 'models/HojaCargo'
import Poblacion from 'models/Poblacion'

export default async function handler(req, res) {

    await conectarDB()
    
    const { method, query: { id } } = req
    switch (method) {        
        case 'GET':
            try {
                if (!id) {
                    const hojacargos = await HojaCargo.find({}).populate('poblacion', {nombre:1, apellidos:1}).lean()
                    const poblacions = await Poblacion.find({},{nombre:1, apellidos:1, fecha_hojacargo: 1}).lean()
                    return res.status(200).json({ success: true, data: {hojacargos: hojacargos, poblacions: poblacions} })
                }
            } catch (error) {
                return res.status(404).json({ success: false })
            }


        default:
            return res
                .status(500)
                .json({ success: false, error: 'Falla de servidor' });
    }

}