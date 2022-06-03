import  React, {useState, useEffect} from 'react';
import {Typography } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {useNavigate} from 'react-router-dom'


import {Link, useLocation} from 'react-router-dom';

import useStyles from './styles';

import { StyledEngineProvider } from '@mui/material/styles';

const NavBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  const navigate = useNavigate();
  const buttons = ['Posts', 'Create']

  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={classes.appBar} position="static">
        <Box className={classes.out}>
          <Box  sx={{display: { xs: 'none', md: 'block'}}}>
            <Link to="/" className={classes.link}>
              <Typography variant="h3" style={{fontFamily: 'Roboto', fontWeight: '700'}}>Blog</Typography>
            </Link>
          </Box>
          <Box sx=
            {{display: { xs: 'flex'}, 
              position: {xs: 'static', md: 'absolute'},
              top: {xs: '0', md: '50%'},
              left: {xs: '0', md: '50%'},
              transform: {xs: 'translate(0,0)', md:'translate(-50%, -50%)'},
              width: '800px',
              justifyContent: 'center'
            }} 
          >
            {buttons.map((e,i) => (
              <Button component={Link} to={`/${e.toLowerCase()}`} key={i} sx={{color: 'white', fontSize: '18px', margin: '10px'}}>{e}</Button>
            ))}
          </Box>
          <Toolbar disableGutters={true} >
            {user ? (
              <Box sx={{display: {xs: 'flex'}, width: '220px', justifyContent: 'space-between', alignItems: 'center'}}>
                <IconButton fontSize="large" color="inherit">
                  <NotificationsNoneIcon sx={{fontSize: '30px'}}/>
                </IconButton>
                <IconButton fontSize="large" color="inherit">
                  <MailOutlineIcon sx={{fontSize: '30px'}}/>
                </IconButton>
                <Avatar sx={{ bgcolor: blue[600] }} alt="Remy Sharp" src="/broken-image.jpg">
                  {user.firstName.charAt(0)}
                </Avatar>
                <IconButton fontSize="large" color="inherit" onClick={logout}>
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
