import conectarDB from '../../../lib/dbConnect'
import Direccion from '../../../models/Direccion';

export default async function handler(req, res){

    await conectarDB()

    const {method} = req
    switch (method) {
        case 'GET':
            try {
            const calle = await Direccion.find({}).lean()
            if(!calle){
                return res.status(404).json({success: false, calle })
            }
            return res.json({success: true, data:calle })
            } catch (error) {
                return res.status(404).json({success: false })
            }

        case 'POST':
            try {
                const calle = new Direccion(req.body);
                await calle.save();

                return res.status(200).json({success: true, calle});
                
            } catch (error) {
                return res
                .status(400)
                .json({success: false, error: error});
            }
    
        default:
            return res
            .status(500)
            .json({success: false, error: 'Falla de servidor'});
    } 

}