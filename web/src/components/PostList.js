import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Link,Button } from '@mui/material';
import { styled } from '@mui/system';
import { getAllPosts } from '../api/post';
import { useNavigate } from 'react-router-dom';
import ErrorChips from './ErrorChips';
const Container = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: '15px',
    wordWrap: "break-word",
    justifyContent: 'center',
    marginTop:'60px'
});
const CustomCard = styled(Card)({
    width: '300px',
    height: '200px',
    margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '13px',
    border: '2px solid',
    borderImage: 'linear-gradient(45deg, #F0F0F0 30%, #F5F5F5 90%)',
    borderImageSlice: 1,
    
});
const CreatePostButton = styled(Button)({
    position: 'absolute',
    top: '15px',
    right: '30px',
    borderRadius: '12px',
    textTransform: 'none',
    backgroundColor:'#000000',
    '&:hover': {backgroundColor: '#111'}
});


const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const handleOnClick = (id) => {
        navigate(`/posts/${id}`)
    }
    const handleCloseErrorModal = () => {
        setError(null);
    };
    const getData = async () => {
        try {
            console.log('coming to edit comp')
            const response = await getAllPosts();
            if (response.status === 200) {
                setPosts(response.data);
            }
        } catch (error) {
            setError(true)
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    const handleCreatePost = () => {
        navigate('/new-post');
    };

    return (
        <Container>
            <CreatePostButton variant="contained" color="primary" onClick={handleCreatePost}>
                Create Post
            </CreatePostButton>
            {posts.map((post, index) => (
                <CustomCard key={index}>
                    <CardContent>
                        <Typography variant="h5" component="div" onClick={() => handleOnClick(post.id)} style={{ cursor: 'pointer' }}>
                            {post.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {post.body.length >= 150 ? post.body.slice(0, 150) + '......' : post.body}
                            {post.body.length >= 150 && (
                                <Link onClick={() => handleOnClick(post.id)} style={{ cursor: 'pointer' }}>Read more</Link>
                            )}
                        </Typography>

                    </CardContent>
                </CustomCard>
            ))}
            <ErrorChips open={error} onClose={handleCloseErrorModal}/>
        </Container>
    );
};

export default PostList;
