import conectarDB from '../../../lib/dbConnect'
import Poblacion from '../../../models/Poblacion'

export default async function handler(req, res) {

    await conectarDB()

    const { method } = req
    switch (method) {
        case 'POST':
            try {
                const poblacion = new Poblacion(req.body);
                await poblacion.save();

                return res.status(200).json({ success: true, poblacion });

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