import Drawer from "components/Drawer";
import FormHojaCargo from "components/hojacargo/FormHojaCargo";
//import conectarDB from "lib/dbConnect";
import { useApiSWR } from "hooks/useApiSWR";
import { Box, LinearProgress } from "@mui/material";

const New = () => {

   
  const { data, isLoading, isError } = useApiSWR("/api/hojacargo")

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

  const formData = {    
    poblacion: null,
    historia_clinica: '',
    problema_salud: '',
    intervension: '',  
    conducta: '',
    fecha: ''
}

  

    return (
        <Drawer
            title='Adicionar Población'
            description='-'
            asunto='Adicionar Población'
        >
            <FormHojaCargo
                formData={formData}                
                data={data}
            />

        </Drawer>
    )
}

export default New

