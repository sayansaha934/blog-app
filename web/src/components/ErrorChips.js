import React from 'react';
import { Snackbar, SnackbarContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ErrorChips = ({ open, onClose, errorMessage }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <SnackbarContent
                message={<Typography variant="body1" align="center">Something went wrong</Typography>}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};

export default ErrorChips;
