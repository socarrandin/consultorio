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



const FormConsultorioMedico = ({ formData, accion = true, consultorios }) => {
    const router = useRouter()

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState(formData);

    const [message, setMessage] = useState([])

    function createData(id, numero, nombre) {
        return { id, nombre, numero };
    }
    const rows = []
    consultorios.map((r) => {
        rows.push(createData(r._id, r.numero, r.nombre))
    })
    const [row, setRow] = useState(rows);
    const column = [
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'numero', headerName: 'Número', width: 100, type: 'string' },
        { field: 'nombre', headerName: 'Nombre', width: 250, type: 'string' }
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
            const res = await fetch('/api/consultoriomedico/consultoriomedico', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            if (!data.success) {
                setOpen(false)
                const { errors } = useMessageError(data.error)
                setMessage(errors)
            } else {                
                setRow([
                    ...row,
                    createData(data.consultorio._id, data.consultorio.numero, data.consultorio.nombre)
                ])
                setForm({
                    ...form,
                    ['numero']: '',
                    ['nombre']: ''

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
                            Listado de Consultorio Médico
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} >
                        <Grid item xs={12} >
                            <TextField
                                fullWidth
                                label="Escribe número consultorio"
                                placeholder="Número Consultorio"
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} mt={1}>
                            <TextField
                                fullWidth
                                label="Escribe nombre consultorio"
                                placeholder="Nombre Consultorio"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                            />
                        </Grid>
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

            <Grid container justifyContent="center" alignItems="center" >

                <Grid item xs={12} md={6} mt={2} >

                    <Table
                        height={380}
                        ischeckbox={false}
                        rows={row}
                        num_row={5}
                        columns={column}
                    />


                </Grid>
            </Grid>
        </>
    )
}

export default FormConsultorioMedico 
