import conectarDB from 'lib/dbConnect'
import ConsultorioMedico from 'models/ConsultorioMedico'

export default async function handler(req, res) {

    await conectarDB()

    // GET api/enfermedad/id_poblacion

    const { method, query: { id } } = req
    switch (method) {
        case 'PUT':
            try {
                const consultorio = await ConsultorioMedico.findByIdAndUpdate(
                    id,
                    req.body,
                    {
                        new: true,
                        runValidators: true
                    }
                ).lean()
                if (!consultorio) {
                    return res.status(404).json({ success: false })
                }
                return res.json({ success: true, data: "Se actualizó correctamente la Enfermedad" })

            } catch (error) {
                return res.status(404).json({ success: false, error })
            }
        case 'GET':
            try {
                if (!id) {
                    const consultorios = await ConsultorioMedico.find({})
                    return res.status(200).json({ success: true, data: consultorios })
                } else {
                    const consultorio = await ConsultorioMedico.findById(id).lean()
                    return res.status(200).json({ success: true, data: consultorio })
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