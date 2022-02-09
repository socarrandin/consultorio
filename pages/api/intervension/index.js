import conectarDB from 'lib/dbConnect'
import Intervension from 'models/Intervension'

export default async function handler(req, res) {

    await conectarDB()    
    
    const { method } = req
    switch (method) {        
        case 'GET':
            try {
                const intervensions = await Intervension.find({})
                return res.status(200).json({ success: true, data: intervensions })
                
            } catch (error) {
                return res.status(404).json({ success: false })
            }


        default:
            return res
                .status(500)
                .json({ success: false, error: 'Falla de servidor' });
    }

}