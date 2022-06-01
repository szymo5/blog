import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 50px',
    height: '80px',
    flexDirection: 'row',
    backgroundColor: '#424242'
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  out: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    position: 'relative'
  }
}));