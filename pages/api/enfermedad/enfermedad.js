import conectarDB from 'lib/dbConnect'
import Enfermedad from 'models/Enfermedad'

export default async function handler(req, res) {

    await conectarDB()

    const { method, body } = req
    switch (method) {
        case 'POST':
            try {
                const enfermedad = new Enfermedad(body)
                await enfermedad.save();
                return res.status(200).json({ success: true, enfermedad });

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