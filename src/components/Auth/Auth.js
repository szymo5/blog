import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import validator from 'validator';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { StyledEngineProvider } from '@mui/material/styles';

import useStyles from './styles';

const initialsState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

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
        setPasswordError(false);
        setEmailError(false);
        try {
            if(!validator.isEmail(formData.email)){
                const err = new Error("Invalid email")
                err.name = 'email';
                throw err;
            }

            const response = await fetch(`http://localhost:8000/users?email=${formData.email}&password=${formData.password}`);
            const data = await response.json();

            if(!(data.length)){
                const err = new Error("Invalid credentials");
                err.name = 'password';
                throw err;
            }

            localStorage.setItem('profile', JSON.stringify(...data));
            navigate('/');

        } catch (error) {
            switch(error.name){
                case 'password':
                    setPasswordError(error.message);
                    break;
                case 'email':
                    setEmailError(error.message);
                    break;
                default:
                    break;
            }
        }
    }

    const signUp = async () => {
        setPasswordError(false);
        setEmailError(false);
        try {
            if(!validator.isEmail(formData.email)){
                const err = new Error("Invalid email")
                err.name = 'email';
                throw err;
            }

            if(!(formData.password === formData.confirmPassword)){
                const err = new Error("Passwords don't match");
                err.name = 'password';
                throw err;
            }

            delete formData.confirmPassword;

            const response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            localStorage.setItem('profile', JSON.stringify(data));
            navigate('/');

        } catch (error) {
            switch(error.name){
                case 'password':
                    setPasswordError(error.message);
                    break;
                case 'email':
                    setEmailError(error.message);
                    break;
                default:
                    break;
            }
            
        }
    }

    const switchSign = () => {
        setIsSignup((prevState) => !prevState);
        setPasswordError(false);
        setEmailError(false);
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
                                error={emailError ? true : false}
                                helperText={emailError}
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
                                error={passwordError ? true : false}
                                helperText={passwordError}
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
                                    error={passwordError ? true : false}
                                    helperText={passwordError}
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