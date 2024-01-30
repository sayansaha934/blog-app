// PostForm.js
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { createPost, getPostById, updatePost } from '../api/post';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorChips from './ErrorChips';
const FormContainer = styled('div')({
    width: '60%',
    margin: 'auto',
    marginTop: '50px',
});

const PostForm = ({ editMode }) => {
    const [post, setPost] = useState({});
    const [error, setError] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()
    const handleCloseErrorModal = () => {
        setError(null);
    };

    const handleCreatePost = async () => {
        try {
            const response = await createPost(post.title, post.body)
            if (response.status === 200) {
                const _id = response.data.id
                navigate(`/posts/${_id}`)
            }
        } catch (error) {
            setError(true);
            console.log(error)
        }
    };
    const handleUpdatePost = async () => {
        try {
            await updatePost(id, post.title, post.body)
            navigate(`/posts/${id}`)
        } catch (error) {
            console.log(error)
        }

    }
    const getData = async () => {
        try {
            const response = await getPostById(id);
            if (response.status === 200) {
                setPost(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (editMode) {
            getData()
        }
    }, [])



    return (
        <FormContainer>
            <Box>
                <InputLabel htmlFor="title" style={{ textAlign: 'left' }}>Title</InputLabel>
                <TextField
                    id="title"
                    name="title"
                    required
                    fullWidth
                    margin="normal"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
            </Box>
            <Box>
                <InputLabel htmlFor="body" style={{ textAlign: 'left' }}>Body</InputLabel>
                <TextField
                    id="body"
                    name="body"
                    required
                    fullWidth
                    multiline
                    rows={20}
                    margin="normal"
                    value={post.body}
                    onChange={(e) => setPost({ ...post, body: e.target.value })}

                />
            </Box>

            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={editMode ? handleUpdatePost : handleCreatePost} style={{ borderRadius: '10px', textTransform: 'none' }} sx={{ backgroundColor: '#000000', '&:hover': { backgroundColor: '#111' } }}>
                    Submit
                </Button>
            </Box>
            <ErrorChips open={error} onClose={handleCloseErrorModal}/>
        </FormContainer>
    );
};
PostForm.defaultProps = {
    editMode: false,
};
export default PostForm;
