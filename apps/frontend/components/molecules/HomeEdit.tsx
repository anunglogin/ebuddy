import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, Typography} from "@mui/material";
import { useSelector } from 'react-redux';
import {CloseRounded} from "@mui/icons-material";
import {RootState} from "../../store/store";
import {useDispatch} from "react-redux";
import {setModal} from "../../store/actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function HomeEdit() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.modal);

    const handleClose = () => {
        dispatch(setModal(false));
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Modal title
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseRounded />
            </IconButton>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                    magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                    ullamcorper nulla non metus auctor fringilla.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}