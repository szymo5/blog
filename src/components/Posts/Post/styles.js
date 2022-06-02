import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
        '& .MuiCardHeader-content':{
            '& span.MuiTypography-root':{
                color: '#fff'
            }
        }
  }
}));