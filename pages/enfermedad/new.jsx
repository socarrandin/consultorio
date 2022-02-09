import Drawer from "components/Drawer";
import FormEnfermedad from "components/enfermedad/FormEnfermedad";
import Enfermedad from "models/Enfermedad";
import conectarDB from "lib/dbConnect";

const New = ({ enfermedads }) => {

    const formData = {
        enfermedad: ''
    }
    return (
        <Drawer
            title='Adicionar intervensión'
            description='-'
            asunto='Adicionar intervensión'
        >

            <FormEnfermedad
                formData={formData}
                enfermedads={enfermedads}
            />



        </Drawer>
    )
}

export default New


export const getServerSideProps = async () => {
    try {
        
        await conectarDB()
        
        const res = await Enfermedad.find({})
        const enfermedads = res.map(doc => {
            const enfermedad = doc.toObject()
            enfermedad._id = enfermedad._id.toString()
            return enfermedad
        })

        return { props: { enfermedads } }


    } catch (error) {
        console.log("error")
        return { props: { success: false, error: 'Error!' } }
    }

}