import React, { useEffect, useState } from 'react';
import { Typography, IconButton, Input, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from '../api/post';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorChips from './ErrorChips';
const Container = styled('div')({
    height: '80vh',
    width: '90%',
    paddingTop: '15px',
    paddingLeft: '35px'

});
const TitleSection = styled('div')({
    textAlign: 'left'
});

const BodySection = styled('div')({
    wordWrap: "break-word",
    textAlign: 'left',
    lineHeight: '28px'
});
const IconContainer = styled('div')({
    position: 'absolute',
    top: '20px',
    right: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
});
const PostDetails = () => {
    const [post, setPost] = useState({});
    const [error, setError] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate()
    const handleCloseErrorModal = () => {
        setError(null);
    };

    const getData = async () => {
        try {
            const response = await getPostById(id);
            if (response.status === 200) {
                setPost(response.data);
            }
        } catch (error) {
            setError(true)
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleEditClick = (id) => {
        navigate(`/posts/${id}/edit`)
    }
    const handleDeleteClick = async (id) => {
        try {
            await deletePost(id)
        } catch (error) {
            setError(true)
            console.log(error)
        }
        navigate(`/`)
    }
    


    return (
        <Container>
            <IconContainer>
                <IconButton aria-label="edit" onClick={() => handleEditClick(post.id)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDeleteClick(post.id)}>
                    <DeleteIcon />
                </IconButton>
            </IconContainer>
            <TitleSection>
                <Typography variant="h2" gutterBottom>
                    {post.title}
                </Typography>
            </TitleSection>

            <BodySection>
            <Typography variant="p" color="text.secondary">
                        {post.body}
                    </Typography>
            </BodySection>
            <ErrorChips open={error} onClose={handleCloseErrorModal}/>
        </Container>
    );
};


export default PostDetails;
