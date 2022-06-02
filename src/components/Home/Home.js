import { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@mui/material';

import Posts from '../Posts/Posts';

const Home = () => {
    const location = useLocation();
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetch('http://localhost:8000/posts');
            setPosts(await data.json()); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [location])

    return ( 
        <Grow in>
            <Container maxWidth="xl" sx={{mt: 7}}>
                <Posts posts={posts}/>
            </Container>
        </Grow>
     );
}
 
export default Home;