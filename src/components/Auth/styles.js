import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    root: {
        '& label.Mui-focused': {
            color: '#424242',
          }, 
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': { 
                borderColor: '#424242',
            },
        },
    },
}));
