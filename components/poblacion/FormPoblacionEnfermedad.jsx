import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useState } from "react";
import { Alert, Stack, TextField, Typography } from '@mui/material';

import TextAutoComplete from 'components/TextAutoComplete'
import Table from 'components/Table'
import { useRouter } from 'next/router';

//hooks

const FormIntervencionPoblacion = ({ formData }) => {
    const router = useRouter()

    const [desactivado, setDesactivado] = useState(true);
    const [form, setForm] = useState({
        _id: formData.poblacion._id,
        enfermedad: null
    });

    console.log(form)

    function createData(id, enfermedad) {
        return { id, enfermedad };
    }
    const rows = []
    formData.poblacion.enfermedads.map((r) => {
        rows.push(createData(r._id, r.enfermedad))
    })

    const [row, setRow] = useState(rows);

    const column = [
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'enfermedad', headerName: 'Enfermedad', width: 250, type: 'string' }
    ]

    const autocompleteProps = {
        options: formData.enfermedad,
        getOptionLabel: (option) => option.enfermedad,
        value: form.enfermedad,
        onChange: (event, newValue) => {
            setForm({
                ...form,
                ['enfermedad']: newValue
            })
            setDesactivado(desactivado = (newValue === null) ? true : false)
        }
    };

    const [message, setMessage] = useState([])

    const handleSubmit = e => {
        e.preventDefault()
        putData(form)
    }


    const putData = async (form) => {
        setMessage([])
        try {
            console.log(form)
            const res = await fetch('/api/poblacion/enfermedad', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            if (!data.success) {
                console.log(data.error)
                const { errors } = useMessageError(data.error)
                setMessage(errors)
            } else {
                setMessage([])
                setDesactivado(true)
                setRow([
                    ...row,
                    data.newEnfermedad
                ])
                setForm({
                    ...form,
                    ['enfermedad']: null
                })
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>

                <Stack m={2} justifyContent="center" alignItems="center">
                    <Grid container pb={2} pt={2} spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Typography variant="h5" component="div">
                                Listado de Enfermadad
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} justifyContent="center" alignItems="center">

                        <Grid item xs={12} md={12}>
                            <TextAutoComplete
                                label='Enfermedades'
                                defaultProps={autocompleteProps}
                            />
                        </Grid>
                    </Grid>


                    <Grid container justifyContent="center" alignItems="center" mt={2}>
                        <Grid item xs={12} md={12} >
                            <Button disabled={desactivado === true} type='submit' variant="contained"> + Adicionar </Button>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack sx={{ width: '100%' }} spacing={1}>
                                {
                                    message.map(({ message }) => (
                                        <Alert severity="error">{message}</Alert>
                                    ))
                                }
                            </Stack>
                        </Grid>
                    </Grid>

                    <Grid mt={2} container justifyContent="center" alignItems="center" >

                        <Grid item xs={12} md={12}>

                            <Table
                                height={350}
                                ischeckbox={false}
                                rows={row}
                                num_row={5}
                                columns={column}
                            />


                        </Grid>
                    </Grid>
                </Stack>

            </form>
        </>
    )
}

export default FormIntervencionPoblacion 
