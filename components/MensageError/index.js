import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

import { useState } from 'react';

const MensageError = ({ tipoError, message = 'none', v = 'top', h = 'right' }) => {

    const [state, setState] = useState({
        open: true,
        vertical: v,
        horizontal: h
    });

    const { vertical, horizontal, open } = state;


    const handleClose = () => {
        setState({ ...state, open: false });
    };


    return (
        <Stack spacing={2} sx={{ width: '100%' }}>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert key={message} onClose={handleClose} severity={tipoError} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

        </Stack>
    )
};

export default MensageError;


