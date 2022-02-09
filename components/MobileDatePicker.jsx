import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useState } from 'react';
import { Stack } from '@mui/material';


const ResponsiveDatePickers = ({ label, name, value }) => {

  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDatePicker
          label={label}
          value={fecha}
          name={name}
          onChange={(handleChange) => {
            setFecha(handleChange);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  )
}

export default ResponsiveDatePickers
