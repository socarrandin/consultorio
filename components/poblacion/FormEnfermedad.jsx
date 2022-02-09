import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/dist/client/router';
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const FormEnfermedad = ({ formData, accion = true }) => {
    const router = useRouter()

    const [form, setForm] = useState({
        enfermedad: formData.enfermedad
    });

    const [message, setMessage] = useState([])

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

    const putData = async (form) => {
        setMessage([])
        const { id } = router.query
        try {
            console.log(form)
            const res = await fetch('/api/poblacion/' + id, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json();
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage(oldmessage => [
                        ...oldmessage,
                        { message: error.message }
                    ])
                }
            } else {
                setMessage([])
                router.push('/poblacion')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const postData = async (form) => {
        setMessage([])
        try {
            console.log(form)
            const res = await fetch('/api/poblacion/poblacion', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json();
            console.log(data);
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage(oldmessage => [
                        ...oldmessage,
                        { message: error.message }
                    ])
                }
            } else {
                setMessage([])
                router.push('/poblacion')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                   

                </Grid>
            </Box>

           

        </form>
    )
}

export default FormEnfermedad 
