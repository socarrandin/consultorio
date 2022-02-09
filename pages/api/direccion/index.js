import conectarDB from 'lib/dbConnect'
import Direccion from 'models/Direccion'

export default async function handler(req, res) {

    await conectarDB()
    
    const { method, query: { id } } = req
    switch (method) {        
        case 'GET':
            try {
                if (!id) {
                    const calles = await Direccion.find({})
                    return res.status(200).json({ success: true, data: calles })
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