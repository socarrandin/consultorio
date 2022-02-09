import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const TextAutoComplete = ({ label, defaultProps, noOptionsText }) => {

    return <Autocomplete

        disablePortal      
        sx={{ width: '300' }}
        {... defaultProps}
        isOptionEqualToValue={(option, value) =>
            option.name === value.name
        }
        renderInput={
            (params) => <TextField {...params} label={label} />
        }
        noOptionsText={noOptionsText}
    // renderOption={(props, lists) => ()}
    />;
};

export default TextAutoComplete;


