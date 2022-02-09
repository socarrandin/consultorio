import conectarDB from 'lib/dbConnect'
import Poblacion from 'models/Poblacion'
import Enfermedad from 'models/Enfermedad'
import Intervension from 'models/Intervension'
import PoblacionIntervension from 'models/PoblacionIntervension'

export default async function handler(req, res) {

    await conectarDB()

    // GET api/poblacion/id_poblacion

    const { method, query: { id } } = req
    switch (method) {
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

        case 'GET':
            try {
                const poblacion = await Poblacion.findById(id).populate('enfermedads').lean()

                if (poblacion) {
                    const enfermedad = await Enfermedad.find({}).lean()
                    const intervension = await Intervension.find({}).lean()
                    const intervensions = await PoblacionIntervension.find({
                        poblacion: poblacion
                    }, { intervension: 1, fecha: 1 }).populate('intervension', { intervension: 1 }).lean()
                    return res.status(200).json({ success: true, data: { poblacion, enfermedad, intervension, intervensions } })
                } else {
                    return res.status(404).json({ success: false })
                }





            } catch (error) {
                return res.status(404).json({ success: false })
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