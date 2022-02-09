import conectarDB from 'lib/dbConnect'
import Poblacion from 'models/Poblacion'

export default async function handler(req, res) {

    await conectarDB()

    const { method, body } = req
    switch (method) {
        case 'POST':
            try {
                const poblacion = await Poblacion.findById(body._id)
                poblacion.enfermedads = poblacion.enfermedads.concat(body.enfermedad._id)
                await poblacion.save();

                const newEnfermedad = {
                    id: body.enfermedad._id,
                    enfermedad: body.enfermedad.enfermedad
                }
                return res.status(200).json({ success: true, newEnfermedad });

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