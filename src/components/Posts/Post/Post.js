import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';

import useStyles from './styles';


import {useNavigate} from 'react-router-dom'

const Post = ({post}) => {
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    const deletePost = (id) => {
        fetch(`http://localhost:8000/posts/${id}`, {
            method: 'DELETE',
        }).then(() => {
            navigate('/');
        })
    }

    return ( 
        <Card sx={{ maxWidth: 345, bgcolor: '#424242', color: '#fff'}}>
            <CardHeader
                className={classes.root}
                avatar={
                <Avatar sx={{ bgcolor: blue[600] }}>
                    {post.author.charAt(0)}
                </Avatar>
                }
                title={post.author}
                subheader={moment(post.date).fromNow()}
            />
            <CardMedia
                component="img"
                height="180"
                image={post.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2">
                    {post.body}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'space-between', height: '40px'}}>
                <Box>
                    <Button size="small" sx={{color: '#fff'}}>Share</Button>
                    <Button size="small" sx={{color: '#fff'}}>Learn More</Button>
                </Box>
                {(post.author_id === user?.id) && (
                    <IconButton color="inherit" onClick={() => deletePost(post.id)}>
                        <DeleteIcon sx={{fontSize: '20px'}}/>
                    </IconButton>
                )}
            </CardActions>
        </Card>
    );
}
 
export default Post;