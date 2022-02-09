import conectarDB from 'lib/dbConnect'
import Poblacion from 'models/PoblacionEnfermedad'

export default async function handler(req, res) {

    await conectarDB()

    // GET api/poblacion/id_poblacion

    const { method, query: { id } } = req
    switch (method) {

        case 'GET':
            try {
                if (!id) {
                    const poblacion = await Poblacion.find({})
                    return res.status(200).json({ success: true, data: poblacion })
                } else {
                    const poblacion = await Poblacion.findById(id).lean()
                    return res.status(200).json({ success: true, data: poblacion })
                }
            } catch (error) {
                return res.status(404).json({ success: false })
            }
        case 'PUT':
            try {
                const poblacion = await Poblacion.findByIdAndUpdate(
                    id,
                    req.body,
                    {
                        new: true,
                        runValidators: true
                    }
                ).lean()
                if (!poblacion) {
                    return res.status(404).json({ success: false })
                }
                return res.json({ success: true, data: "Se actualizó correctamente población" })
            } catch (error) {
                return res.status(404).json({ success: false, error })
            }
        case 'DELETE':
            try {
                const poblacion = await Poblacion.findByIdAndDelete(id)
                if (!poblacion) {
                    return res.status(404).json({ success: false })
                }
                return res.json({ success: true, data: "Eliminó corectamente el objeto población" })

            } catch (error) {
                return res.status(404).json({ success: false })
            }

        default:
            return res
                .status(500)
                .json({ success: false, error: 'Falla de servidor' });
    }

}