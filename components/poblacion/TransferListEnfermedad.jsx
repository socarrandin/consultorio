import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import {  Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}


function difference(a, b) {
  return a.filter(value => !b.includes(value));
}


const TransferListEnfermedad = ({ enfermedades = [], enfermedadesPaciente = [], id, formData }) => {

  const router = useRouter()

  console.log(formData)



  const rowsEnfermedades = []
  const cont = 0
  enfermedades.map(e => {
    enfermedadesPaciente.map(ey => {
      if (e._id === ey._id) {
        cont++
      }
    })
    if (cont === 0) {
      rowsEnfermedades.push(e)
    }
    cont = 0
  });


  const [message, setMessage] = useState([])
  const [desactivado, setDesactiado] = useState(true)
  const [checked, setChecked] = useState([]);

  const [form, setForm] = useState(formData);
  const [left, setLeft] = useState(rowsEnfermedades);
  const [right, setRight] = useState(enfermedadesPaciente);




  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    setDesactiado(false)
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setDesactiado(false)

  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    setDesactiado(false)
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    setDesactiado(false)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    form.enfermedades = []

    right.map((r) => {
      form.enfermedades.push(r)
    })
    setRight(right)
    putDataEnfermedades(form)
  }

  //funcion actualizar enfermedades 
  const putDataEnfermedades = async (form) => {

    try {
      const res = await fetch(`/api/poblacion/${id}`, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),

      });
      const data = await res.json();
      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMessage((oldmenssage) => [
            ...oldmenssage,
            { message: error.message }
          ]);
        }
      } else {

        
      setDesactiado(true)
       // router.push("/poblacion")
      }

    } catch (error) {
      console.log(error)
    }
  }


  const customList = (items) => (

    <Paper sm={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          return (
            <ListItem
              key={value._id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': value._id,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={value._id} primary={value.enfermedad} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>

  );

  return (

    <Box mb={2}>

      <form onSubmit={handleSubmit}>
        <Grid container pb={2} spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h5" component="div">
              Listado de Enfermedades
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>{customList(left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList(right)}</Grid>
        </Grid>

        <Grid container p={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12} >
            <Button disabled={desactivado === true} type='submit' variant="contained"> Guardar </Button>
          </Grid>
        </Grid>
      </form>
    </Box>



  )
}

export default TransferListEnfermedad



