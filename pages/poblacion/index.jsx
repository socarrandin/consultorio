import Drawer from "components/Drawer"
//import conectarDB from "lib/dbConnect"
//import Poblacion from "models/Poblacion"
import { useApiSWR } from "hooks/useApiSWR";

import TablePoblacion from "components/poblacion/TablePoblacion";
import { Box, LinearProgress } from "@mui/material";

export default function index() {


    const { data, isLoading, isError } = useApiSWR("/api/poblacion")

    if (isError) {
        return <Box sx={{ display: "flex" }}>error</Box>;
    }

    if (isLoading) {
        return (
            <Drawer title=" Población" description="-" asunto="Población">
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </Drawer>
        );
    }
    
    console.log(data)


    return (
        <Drawer
            title='Listado Población'
            description='-'
            asunto='Listado de Población'
        >
           

            <TablePoblacion poblaciones={data} />


        </Drawer>
    )
}
 /*

export async function getServerSideProps(){
  try {
       await conectarDB() 
              
       const res = await Poblacion.find({}).populate('consultorio')
        
       const poblaciones = res.map(doc => {
           const poblacion = doc.toObject()
           poblacion._id = poblacion._id.toString() 
           poblacion.consultorio._id = poblacion.consultorio._id.toString()
           poblacion.calle._id = poblacion.calle._id.toString()
           poblacion.fecha_nacimiento = poblacion.fecha_nacimiento.toString()
           return poblacion
       })

       console.log(poblaciones)

       return {props: {poblaciones}}


   } catch (error) {
       console.log("error")
       return {props: {success: false, error: 'Error!'}}
   }

}*/