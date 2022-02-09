import conectarDB from 'lib/dbConnect'
import ConsultorioMedico from 'models/ConsultorioMedico'

export default async function handler(req, res) {

    await conectarDB()
    
    const { method, query: { id } } = req
    switch (method) {        
        case 'GET':
            try {
                if (!id) {
                    const consultorios = await ConsultorioMedico.find({}).lean()
                    return res.status(200).json({ success: true, data: consultorios })
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