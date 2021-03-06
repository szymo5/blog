import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { Container, Grow, Box, CircularProgress, Typography} from '@mui/material';

import Posts from '../Posts/Posts';

import useStyles from './styles';

const Home = () => {
    const classes = useStyles()
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        fetch('http://localhost:8000/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 1500)
    }, [location])

    return ( 
        <Grow in>
            <Container maxWidth="xl" sx={{mt: 7}}>
                {isLoading && (
                    <Box className={classes.loading}>
                        <CircularProgress sx={{color: '#424242'}}/>
                    </Box>
                )}
                {(!isLoading && !posts.length) && (
                    <Box sx={{mt: 8}}>
                        <Typography variant="h6" align="center">
                            No posts published
                        </Typography>
                    </Box>
                )}
                {posts.length > 0 && <Posts posts={posts}/>}
            </Container>
        </Grow>
     );
}
 
export default Home;