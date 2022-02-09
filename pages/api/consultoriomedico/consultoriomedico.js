import conectarDB from 'lib/dbConnect'
import ConsultorioMedico from 'models/ConsultorioMedico'

export default async function handler(req, res) {

    await conectarDB()

    const { method } = req
    switch (method) {
        case 'POST':
            try {
                const consultorio = new ConsultorioMedico(req.body)
                await consultorio.save();
                return res.status(200).json({ success: true, consultorio });

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