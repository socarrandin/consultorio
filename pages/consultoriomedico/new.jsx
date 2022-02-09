import Drawer from "components/Drawer";
import FormConsultorioMedico from "components/consultoriomedico/FormConsultorioMedico";
//import ConsultorioMedico from "models/ConsultorioMedico";
//import conectarDB from "lib/dbConnect";

import { Box, LinearProgress } from "@mui/material";
//hooks
import { useApiSWR } from "hooks/useApiSWR"


const New = () => {

    const { data, isLoading, isError } = useApiSWR("/api/consultoriomedico")

    if (isError) {
        return <Box sx={{ display: "flex" }}>error</Box>;
    }

    if (isLoading) {
        return (
            <Drawer title="Consultorio Médico" description="-" asunto="Consultorio Médico">
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </Drawer>
        );
    }

    console.log(data)


    const formData = {
        nombre: '',
        numero: ''
    }

    return (
        <Drawer
            title='Adicionar Consultorio Médico'
            description='-'
            asunto='Adicionar Consultorio Médico'
        >

            <FormConsultorioMedico
                formData={formData}
                consultorios={data}
            />



        </Drawer>
    )
}

export default New

/*
export const getServerSideProps = async () => {
    try {
        
        await conectarDB()
        
        const res = await ConsultorioMedico.find({})
        const consultorios = res.map(doc => {
            const consultorio = doc.toObject()
            consultorio._id = consultorio._id.toString()
            return consultorio
        })

        return { props: { consultorios } }


    } catch (error) {
        console.log("error")
        return { props: { success: false, error: 'Error!' } }
    }

}*/