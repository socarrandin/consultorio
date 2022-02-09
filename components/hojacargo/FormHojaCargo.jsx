import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useState } from "react";
import { Alert, Divider, FormControl, FormControlLabel, FormLabel, Hidden, IconButton, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TextAutoComplete from 'components/TextAutoComplete'
import Table from 'components/Table'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MensageError from 'components/MensageError';

//hooks
import { useMessageError } from 'hooks/useMessageError';

const FormHojaCargo = ({ formData, data }) => {

    const [form, setForm] = useState(formData);

    
    function createData(id, historia_clinica, nombre_apellidos, intervension, problema_salud, conducta) {
        return { id, historia_clinica, nombre_apellidos, intervension, problema_salud, conducta };
    }
    const rows = []
    data.hojacargos?.map((h) => {
        rows.push(createData(h._id, h.historia_clinica, `${h.poblacion.nombre} ${h.poblacion.apellidos}`, h.intervension, h.problema_salud, h.conducta))
    })

    const [row, setRow] = useState(rows);

    const fecha_fin = new Date()
    const fecha_inicio = fecha_fin.setMonth(fecha_fin.getMonth() - 4)

    const [fecha_end, setFechaEnd] = useState(new Date());
    const [fecha_start, setFechaStart] = useState(fecha_inicio);

    const column = [
        { field: 'id', headerName: 'ID', width: 50, type: 'string' },
        { field: 'historia_clinica', headerName: 'No. Historia Clínica', width: 150, type: 'string' },
        { field: 'nombre_apellidos', headerName: 'Nombre y Apellidos', width: 200, type: 'string' },
        { field: 'intervension', headerName: 'Intervensión', width: 200, type: 'string' },
        { field: 'problema_salud', headerName: 'Problemas de Salud', width: 300, type: 'string' },
        { field: 'conducta', headerName: 'Conducta', width: 300, type: 'string' }
    ]


    const poblacions = data.poblacions

    console.log(poblacions)

    //filtro
    const ResultPoblacionAdmitida = poblacions?.filter(p => {
        return (new Date(p.fecha_hojacargo) < fecha_start || p.fecha_hojacargo == null)
    })

    console.log(form)

    const [poblacionAdmitida, setPoblacionAdmitida] = useState(ResultPoblacionAdmitida);

    const autocompleteProps = {
        options: poblacionAdmitida,
        getOptionLabel: (option) => option.nombre + ' ' + option.apellidos,
        value: form.poblacion,
        onChange: (event, newValue) => {
            setForm({
                ...form,
                ['poblacion']: newValue
            })
        }
    };



    const [message, setMessage] = useState([])

    const handleChange = e => {
        const { value, name } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const FiltrarPoblacion = () => {
        console.log('entre')
        setPoblacionAdmitida(ResultPoblacionAdmitida)
    }

    const handleSubmit = e => {
        e.preventDefault()
        postData(form)
    }

    const postData = async (form) => {
        setMessage([])
        try {
            const res = await fetch('/api/hojacargo/hojacargo', {
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
            } else {
                setMessage([])
                const h = data.hojacargo
                setRow([
                    ...row,
                    createData(h._id, h.historia_clinica, `${h.poblacion.nombre} ${h.poblacion.apellidos}`, h.intervension, h.problema_salud, h.conducta)
                ])
                setForm(formData)
                FiltrarPoblacion()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <Stack justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>

                        <Grid container pb={2} pt={2} spacing={2} justifyContent="center" alignItems="center">
                            <Grid item >
                                <Typography variant="h5" component="div">
                                    Hoja de Cargo:
                                </Typography>
                            </Grid>
                            <Grid item >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <MobileDatePicker
                                            label="Selecione Fecha admitida"
                                            value={fecha_start}
                                            name="fecha_admitida"
                                            onChange={(handleChange) => {
                                                setFechaStart(handleChange);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>

                                </LocalizationProvider>
                            </Grid>

                            <Grid item  >
                                <IconButton onClick={FiltrarPoblacion} color="secondary" aria-label="filtar población">
                                    <SearchIcon />
                                </IconButton>
                            </Grid>

                        </Grid>

                        <Divider variant="middle" pb={2} />

                        <Grid container mt={1} mb={1} spacing={2}>



                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Número Historia Cínica"
                                    placeholder="Número Historia Cínica"
                                    name="historia_clinica"
                                    value={form.historia_clinica}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={6} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <MobileDatePicker
                                            label="Fecha"
                                            value={form.fecha = fecha_end}
                                            name="fecha"
                                            onChange={(handleChange) => {
                                                setFechaEnd(handleChange);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextAutoComplete
                                    label='Selecione el Paciente'
                                    defaultProps={autocompleteProps}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Escribe Problema de Salud"
                                    multiline
                                    rows={4}
                                    //defaultValue=""
                                    name="problema_salud"
                                    value={form.problema_salud}
                                    onChange={handleChange}
                                />

                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Escribe la Conducta"
                                    multiline
                                    name="conducta"
                                    rows={4}
                                    // defaultValue=""
                                    value={form.conducta}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Selecione la Intervensión</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="intervension"
                                        value={form.intervension}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="seguimiento_medico" control={<Radio />} label="Seguimiento Médico" />
                                        <FormControlLabel value='terreno' control={<Radio />} label="Terreno" />
                                        <FormControlLabel value='consulta' control={<Radio />} label="Consulta" />


                                    </RadioGroup>
                                </FormControl>
                            </Grid>



                        </Grid>


                        <Grid container justifyContent="center" alignItems="center" mt={2}>
                            <Grid item xs={12} md={12} >
                                <Button type='submit' variant="contained"> + Adicionar </Button>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack sx={{ width: '100%' }} spacing={1}>
                                    {

                                        message.map(({ message }) => (
                                            <MensageError
                                                tipoError='error'
                                                message={message}
                                            />
                                        ))
                                    }
                                </Stack>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid mt={2} container justifyContent="center" alignItems="center" >

                        <Grid item xs={12} md={12}>

                            <Table
                                height={380}
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

export default FormHojaCargo 
