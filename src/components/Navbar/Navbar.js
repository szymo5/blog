import  React, {useState, useEffect} from 'react';
import {Typography } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

import {Link, useLocation} from 'react-router-dom';

import useStyles from './styles';

import { StyledEngineProvider } from '@mui/material/styles';

const NavBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();

  // const handleLog = () => {
  //   setUser(prevState => !prevState);
  // }

  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('profile')));
      console.log(user)
  },[location])

  const buttons = ['Posts', 'Create']
 
  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={classes.appBar} position="static">
        <Box className={classes.out}>
          <Link to="/" className={classes.link}>
            <Typography variant="h3" style={{fontFamily: 'Roboto', fontWeight: '700'}}>Blog</Typography>
          </Link>
          <Box sx={{display: { xs: 'none', md: 'flex' }, width: '800px', justifyContent: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            {buttons.map((e,i) => (
              <Button component={Link} to={`/${e.toLowerCase()}`} key={i} sx={{color: 'white', fontSize: '18px', margin: '10px'}}>{e}</Button>
            ))}
          </Box>
          <Toolbar disableGutters={true} >
            {user ? (
              <Box sx={{display: {md: 'flex'}, width: '220px', justifyContent: 'space-between', alignItems: 'center'}}>
                <IconButton fontSize="large" color="inherit">
                  <NotificationsNoneIcon sx={{fontSize: '30px'}}/>
                </IconButton>
                <IconButton fontSize="large" color="inherit">
                  <MailOutlineIcon sx={{fontSize: '30px'}}/>
                </IconButton>
                <Avatar sx={{ bgcolor: blue[600] }} alt="Remy Sharp" src="/broken-image.jpg">
                  {user.firstName.charAt(0)}
                </Avatar>
                <IconButton fontSize="large" color="inherit">
                  <LogoutIcon sx={{fontSize: '30px'}}/>
                </IconButton>
              </Box>
            ): (
              <Link to="/auth" className={classes.link}>
                <IconButton fontSize="large" color="inherit">
                  <LoginIcon sx={{fontSize: '30px'}}/>
                </IconButton>
              </Link>
            )}
          </Toolbar>
        </Box>
      </AppBar>
    </StyledEngineProvider>
  );
};
export default NavBar;
