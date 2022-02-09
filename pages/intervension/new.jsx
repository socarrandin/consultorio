import Drawer from "components/Drawer";
import FormIntervension from "components/intervension/FormIntervension";
import Intervension from "models/Intervension";
import conectarDB from "lib/dbConnect";

const New = ({ intervensiones }) => {

    const formData = {
        intervension: ''
    }
    return (
        <Drawer
            title='Adicionar intervensión'
            description='-'
            asunto='Adicionar intervensión'
        >

            <FormIntervension
                formData={formData}
                intervensiones={intervensiones}
            />



        </Drawer>
    )
}

export default New


export const getServerSideProps = async () => {
    try {
        
        await conectarDB()
        
        const res = await Intervension.find({})
        const intervensiones = res.map(doc => {
            const intervension = doc.toObject()
            intervension._id = intervension._id.toString()
            return intervension
        })

        console.log(intervensiones)

        return { props: { intervensiones } }


    } catch (error) {
        console.log("error")
        return { props: { success: false, error: 'Error!' } }
    }

}