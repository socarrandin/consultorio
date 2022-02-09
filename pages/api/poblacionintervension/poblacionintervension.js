import conectarDB from 'lib/dbConnect'
import PoblacionIntervension from 'models/PoblacionIntervension'
import Poblacion from 'models/Poblacion'


export default async function handler(req, res) {

    await conectarDB()

    const { method, body } = req
    switch (method) {
        case 'POST':
            try {
                
                const poblacionintrevension = new PoblacionIntervension({
                    poblacion: body.poblacion, 
                    intervension: body.intervension, 
                    fecha:body.fecha
                });                          
                await poblacionintrevension.save();
                const poblacion = await Poblacion.findById(body.poblacion._id)
                poblacion.intervensions = poblacion.intervensions.concat(poblacionintrevension._id)               
                await poblacion.save();

                const newIntervension = {
                    id: poblacionintrevension._id,
                    intervension: body.intervension.intervension, 
                    fecha:body.fecha    
                }

                return res.status(200).json({ success: true, newIntervension });

            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, error: error });
            }

        default:
            return res
                .status(500)
                .json({ success: false, error: 'Falla de servidor' });
    }

}