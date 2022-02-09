import conectarDB from 'lib/dbConnect'
import Intervension from 'models/Intervension'

export default async function handler(req, res) {

    await conectarDB()

    const { method } = req
    switch (method) {
        case 'POST':
            try {
                const intervension = new Intervension(req.body);
                await intervension.save();
                return res.status(200).json({ success: true, intervension });

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