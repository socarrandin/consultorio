import Drawer from "components/Drawer";
import FormPoblacion from "components/poblacion/FormPoblacion";
import useSWR from "swr";
import { useRouter } from "next/router";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const fetcher = async url => {
    const res = await fetch(url)

    if(!res.ok){
        const error = new Error('Error de data')
        error.info = await res.json()
        error.status = res.status
        throw error
    }

    const {data} = await res.json();
    return data
}

const EditPoblacion = () => {

    const router = useRouter()
    const {id} = router.query

    const {data: poblacion, error} = useSWR(id ? '/api/poblacion/'+id : null,  fetcher)

    if(error){
        return (
            <Box sx={{ display: 'flex' }}>
               error
            </Box>
        )

    }
    if(!poblacion){
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }
    const formData = {
        nombre : poblacion.nombre,
        apellidos : poblacion.apellidos
    }


    return (
        <Drawer 
          title='Editar Población'
          description= '-'
          asunto= 'Editar Población'
          >          
            <FormPoblacion
                accion = {false}
                formData = {formData}

            >
            </FormPoblacion>
        </Drawer>
    )
}

export default EditPoblacion

