import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import Link from "next/link";
import { useState } from 'react';


function createData(_id, nombre, apellidos) {
    return { _id, nombre, apellidos };
}
  

const TablePoblacion = ({poblaciones}) => {


    const router = useRouter()

    const [poblacion, setPoblacion] = useState(poblaciones);

    const deleteData = async(id) => {
      try {
        await fetch('/api/poblacion/'+id, {
          method: 'DELETE'
        })
        setPoblacion(poblacion)
        router.push('/poblacion')

      } catch (error) {
        
      }
    }


    const rows = [];    
    {
        poblaciones.map((poblacion)=>{
            rows.push(createData(poblacion._id.toString(), poblacion.nombre, poblacion.apellidos),)
        })
    }


    return (
        <>

<Grid container spacing={2}>
  <Grid item xs={8}>
    <Link href="/poblacion/new">
    <Button variant="contained">Adicionar Población</Button>
    </Link>
  </Grid>
  <Grid item xs={12}>
  

      

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellidos</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id.toString()}
              </TableCell>
              <TableCell align="right">{row.nombre}</TableCell>
              <TableCell align="right">{row.apellidos}</TableCell>
              <TableCell align="right">

              <ButtonGroup variant="text" aria-label="text button group">
                <Link href={'/poblacion/'+ row._id.toString()+'/all'}>
                <Button>Editar</Button>
                </Link>


                <Button onClick={()=>deleteData(row._id)}>Eliminar</Button>                
              </ButtonGroup>
                
              </TableCell>

            
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Grid>
</Grid>
            
        </>
    )
}

export default TablePoblacion
