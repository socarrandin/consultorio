import { Box, Paper, Grid, LinearProgress } from "@mui/material";

//importaciones
//import conectarDB from "lib/dbConnect";
import Drawer from "components/Drawer";

//import Enfermedad from "models/Enfermedad";
//import Intervension from "models/Intervension";

import { useRouter } from "next/router";

import FormPoblacionIntervencion from "components/poblacion/FormPoblacionIntervencion";
import FormPoblacionEnfermedad from "components/poblacion/FormPoblacionEnfermedad";

import { useApiSWR } from "hooks/useApiSWR";

const all = () => {

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useApiSWR(id ? "/api/poblacion/" + id : null)

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
    <Drawer title=" Población" description="-" asunto="Población">
      <Box md={2} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        
        <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <FormPoblacionEnfermedad               
                formData={data}
              />
            </Paper>
            
          </Grid>

        
           
          <Grid item xs={12} md={6} >
            <Paper elevation={3}>
              <FormPoblacionIntervencion               
                formData={data}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default all;


/*
export async function getServerSideProps() {
  try {
    await conectarDB();

    const resIntervension = await Intervension.find({});

    const interversiones = resIntervension.map((i) => {
      const interversion = i.toObject();
      interversion._id = interversion._id.toString();
      return interversion;
    });

    const resEnfermedad = await Enfermedad.find({});

    const enfermedades = resEnfermedad.map((e) => {
      const enfermedad = e.toObject();
      enfermedad._id = enfermedad._id.toString();
      return enfermedad;
    });

    return { props: { enfermedades, interversiones } };
  } catch (error) {
    console.log("error");
    return { props: { success: false, error: "Error!" } };
  }
}
*/