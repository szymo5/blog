import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    root: {                           // - The TextField-root
        '& label.Mui-focused': {
            color: '#424242',
          },  // - For demonstration: set the TextField-root border
                     // - Make the border more distinguishable

        // (Note: space or no space after `&` matters. See SASS "parent selector".)
        '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
                       // - The <fieldset> inside the Input-root
                  // - Set the Input border
        
             // - Set the Input border when parent has :hover
            '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
                borderColor: '#424242',
            },
        },
    },
}));

// https://stackoverflow.com/questions/52911169/how-to-change-the-border-color-of-mui-textfield