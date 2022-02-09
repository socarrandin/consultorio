
//componentes mui
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"




const SelectDireccionPoblacion = ({ form, handleChange, calles, name }) => {

    const rows = [];
    {
        calles.map((calle) => {
            rows.push(<MenuItem value={calle._id.toString()}>{calle.calle}</MenuItem>)
        })
    }


    return (

        <FormControl fullWidth>
            <InputLabel id="select-calle">Calle / Ave </InputLabel>
            <Select
                labelId="select-calle"
                id="calle"
                name= {name}
                value={form.calle}
                label="Calle o Ave"
                onChange={handleChange}
            >
                {/* Listado de calles*/}
                {rows}

            </Select>
        </FormControl>

    )
}

export default SelectDireccionPoblacion

