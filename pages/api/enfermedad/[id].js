import conectarDB from 'lib/dbConnect'
import Enfermedad from 'models/Enfermedad'

export default async function handler(req, res) {

    await conectarDB()

    // GET api/enfermedad/id_poblacion

    const { method, query: { id } } = req
    switch (method) {
        case 'PUT':
            try {
                const enfermedad = await Enfermedad.findByIdAndUpdate(
                    id,
                    req.body,
                    {
                        new: true,
                        runValidators: true
                    }
                ).lean()
                if (!enfermedad) {
                    return res.status(404).json({ success: false })
                }
                return res.json({ success: true, data: "Se actualizó correctamente la Enfermedad" })
            } catch (error) {
                return res.status(404).json({ success: false, error })
            }
        case 'GET':
            try {
                if (!id) {
                    const enfermedads = await Enfermedad.find({})
                    return res.status(200).json({ success: true, data: enfermedads })
                } else {
                    const enfermedad = await Enfermedad.findById(id).lean()
                    return res.status(200).json({ success: true, data: enfermedad })
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