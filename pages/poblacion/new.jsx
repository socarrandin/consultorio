import Drawer from "components/Drawer";
import FormPoblacion from "components/poblacion/FormPoblacion";

import conectarDB from "lib/dbConnect";

import Direccion from "models/Direccion";
import ConsultorioMedico from "models/ConsultorioMedico";

const New = ({direcciones,consultorios}) => {

  

    const formData = {
        nombre: '',
        apellidos: '',
        fecha_nacimiento: '',
        sexo: '',
        ci: '',        
        no_vivienda: '',
        no_nucleo: '',
        calle: '',
        consultorio: ''
    }
    return (
        <Drawer
            title='Adicionar Población'
            description='-'
            asunto='Adicionar Población'
        >
            <FormPoblacion
                formData={formData}                
                calles={direcciones}
                consultorios={consultorios}
            />

        </Drawer>
    )
}

export default New


export async function getServerSideProps(){
    try {
        await conectarDB() 
               
        const res = await Direccion.find({})
         
        const direcciones = res.map(doc => {
            const direccion = doc.toObject()
            direccion._id = direccion._id.toString()
            return direccion
        })

        const res2 = await ConsultorioMedico.find({})
         
        const consultorios = res2.map(doc => {
            const consultorio = doc.toObject()
            consultorio._id = consultorio._id.toString()
            return consultorio
        })

        return {props: {direcciones, consultorios}}


    } catch (error) {
        console.log("error")
        return {props: {success: false, error: 'Error!'}}
    }

}