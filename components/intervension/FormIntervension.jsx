import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useState } from "react";
import { useRouter } from 'next/dist/client/router';
import { Typography } from '@mui/material';

import Table from "components/Table"
import MensageError from 'components/MensageError';
import { useMessageError } from 'hooks/useMessageError';
import BackdropProgress from 'components/Alert/BackdropProgress';

const FormIntervension = ({ formData, accion = true, intervensiones }) => {
    const router = useRouter()

    const [form, setForm] = useState(formData);
    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState([])

    function createData(id, intervension) {
        return { id, intervension };
    }
    const rows = []
    intervensiones.map((r) => {
        rows.push(createData(r._id, r.intervension))
    })
    const [row, setRow] = useState(rows);

    console.log(row)

    const column = [
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'intervension', headerName: 'Intervensión', width: 400, type: 'string' }
    ]


    const handleChange = e => {
        const { value, name } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }


    const handleSubmit = e => {
        e.preventDefault()
        if (accion) {
            postData(form)
        } else {
            putData(form)
        }
    }

    const postData = async (form) => {
        setMessage([])
        try {
            setOpen(true)
            const res = await fetch('/api/intervension/intervension', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            if (!data.success) {
                const { errors } = useMessageError(data.error)
                setMessage(errors)
                setOpen(false)
            } else {  
                setRow([
                    ...row,
                    createData(data.intervension._id, data.intervension.intervension)
                ])
                setForm({
                    ...form,
                    ['intervension']: ''
                })
                setOpen(false)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <BackdropProgress open={open} />
            <form onSubmit={handleSubmit}>

                <Grid container spacing={2} justifyContent="center" alignItems="center">

                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" mb={2} component="div">
                            Listado de Intervensiones
                        </Typography>
                        <TextField
                            fullWidth
                            label="Escribe el tipo de intervensión"
                            placeholder="Intervensión"
                            name="intervension"
                            value={form.intervension}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid mt={2} item xs={12} md={6} >
                        <Button variant="contained" onClick={handleSubmit}>+ Adicionar</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={12} mt={2}>


                        {
                            message.map(({ message }) => (

                                <MensageError
                                    tipoError='error'
                                    message={message}
                                    vertical='top'
                                    horizontal='right'
                                />

                            ))
                        }
                    </Grid>
                </Grid>

            </form>

            <Grid  container justifyContent="center" alignItems="center" >

                <Grid item xs={12} md={6}  >

                    <Table
                        height={380}
                        ischeckbox={true}
                        rows={row}
                        num_row={5}
                        columns={column}
                    />


                </Grid>
            </Grid>
        </>
    )
}

export default FormIntervension 
