import {useState} from 'react';
import {useNavigate} from 'react-router-dom'

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { StyledEngineProvider } from '@mui/material/styles';

import useStyles from './styles';
import { ConstructionOutlined } from '@mui/icons-material';

const initialsState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialsState);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            signUp();
        } else {
            signIn();
        }
    }

    const signIn = async () => {
        // fetch(`http://localhost:8000/users?email=${formData.email}&password=${formData.password}`)
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        //     })
        try {
            const response = await fetch(`http://localhost:8000/users?email=${formData.email}&password=${formData.password}`);
            const data = await response.json();

            localStorage.setItem('profile', JSON.stringify(...data));
            navigate('/');

        } catch (error) {
            console.log(error);
        }
    }

    const signUp = () => {
        try {
            if(!(formData.password === formData.confirmPassword)){
                throw new Error("Passwords don't match");
            }

            delete formData.confirmPassword;

            fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            }).then((res) => {
                return res.json();
            }).then((data) => {
                localStorage.setItem('profile', JSON.stringify(data));
                navigate('/');
            })
        } catch (error) {
            console.log(error);
        }
    }

    const switchSign = () => {
        setIsSignup((prevState) => !prevState);
        //console.log(formData)
    }

    return ( 
        <StyledEngineProvider injectFirst>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar sx={{m: 1, bgcolor: '#424242'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                </Box>
                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        autoFocus
                                        variant="outlined"
                                        className={classes.root}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        variant="outlined"
                                        className={classes.root}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </>
                        )
                    }
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                className={classes.root}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                className={classes.root}
                                onChange={handleChange}
                            />
                        </Grid>
                        {isSignup && (
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    className={classes.root}
                                    onChange={handleChange}
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Button type="submit" variant="contained" sx={{m: '20px 0px', bgcolor: '#424242', color: "#fff", ":hover": {bgcolor: '#424242'}}} fullWidth>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
                    <Grid container>
                        <Grid item xs={5}>
                            {
                                !isSignup &&
                                    <Button sx={{color: '#424242'}}>
                                        Forgot password
                                    </Button>
                            }
                        </Grid>
                        <Grid item xs={7} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button sx={{color: '#424242'}} onClick={switchSign}>
                                {
                                    isSignup ? 'Already have an account?' : "Don't have an account?"
                                }
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </StyledEngineProvider>
     );
}
 
export default Auth;