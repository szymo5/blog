import {useState} from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Box, Typography} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import FileBase from 'react-file-base64';
import moment from 'moment';

import { StyledEngineProvider } from '@mui/material/styles';

import useStyles from './styles';

const Create = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({
        title: '', body: '', image: '', author: user?.firstName, author_id: user?.id, date: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const date = new Date().toISOString();
        postData.date = date;

        if(!postData.image){
            postData.image = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzRUM2NkYzMEFCQzExRTY5OEY3RUZBMjFFNjEyMTg5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUzRUM2NkY0MEFCQzExRTY5OEY3RUZBMjFFNjEyMTg5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTNFQzY2RjEwQUJDMTFFNjk4RjdFRkEyMUU2MTIxODkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTNFQzY2RjIwQUJDMTFFNjk4RjdFRkEyMUU2MTIxODkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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';
        }

        fetch('http://localhost:8000/posts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData)
            })
    }


    const classes = useStyles();


    if(!user){
        return (
            <Box sx={{mt: 8}}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own posts.
                </Typography>
            </Box>
        )
    }

    return ( 
        <StyledEngineProvider injectFirst>
            <Container maxWidth="xs" component="main" sx={{mt: 8}}>
            <CssBaseline/>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="title"
                                    name="title"
                                    autoFocus
                                    variant="outlined"
                                    className={classes.root}
                                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                                />
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="body"
                                    name="body"
                                    autoFocus
                                    variant="outlined"
                                    className={classes.root}
                                    rows={4}
                                    multiline
                                    onChange={(e) => setPostData({...postData, body: e.target.value})}
                                />
                        </Grid>
                        <Grid item xs={12}>
                                <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, image: base64})}/>
                        </Grid>
                        <Grid item xs={6}>
                                <Button type="submit" variant="contained" sx={{m: '20px 0px', bgcolor: '#424242', color: "#fff", ":hover": {bgcolor: '#424242'}}} fullWidth>Submit</Button>
                        </Grid>
                        <Grid item xs={6}>
                                <Button variant="contained" sx={{m: '20px 0px', bgcolor: '#424242', color: "#fff", ":hover": {bgcolor: '#424242'}}} fullWidth>Clear</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            </StyledEngineProvider>
       
     );
}
 
export default Create;