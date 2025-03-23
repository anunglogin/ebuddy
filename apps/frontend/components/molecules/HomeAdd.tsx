import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    styled,
} from "@mui/material";
import { useSelector } from 'react-redux';
import {CloseRounded} from "@mui/icons-material";
import {RootState} from "../../store/store";
import {useDispatch} from "react-redux";
import {setModal} from "../../store/actions";
import Input from "../atoms/Input";
import {useEffect, useState} from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function HomeAdd() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [totalAverageWeightRatings, setTotalAverageWeightRatings] = useState(0);
    const [totalNumberOfRent, setTotalNumberOfRents] = useState(0);

    const handleClose = () => {
        dispatch(setModal({openAdd: false, openEdit: false, data: ''}));
    };

    const clearForm = () => {
        setEmail('');
        setName('');
        setPassword('');
        setTotalAverageWeightRatings(0);
        setTotalNumberOfRents(0);
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`/apis/users`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer test',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    totalAverageWeightRatings,
                    totalNumberOfRent
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            alert('Success to save');
            dispatch(setModal({openAdd: false, openEdit: false, data: ''}));
            clearForm();
        } catch (e) {
            alert('Failed to save data '+e);
        }
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen.modalAdd}
            fullWidth={true}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Add User
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
                <Stack spacing={2}>
                    <Input label={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                    <Input label={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input label={'Password'} value={password} type={"password"} onChange={(e) => setPassword(e.target.value)} />
                    <Input label={'Average Weight Rating'} type={"number"} value={totalAverageWeightRatings} onChange={(e) => setTotalAverageWeightRatings(parseInt(e.target.value))} />
                    <Input label={'Number Of Rent'} type={"number"} value={totalNumberOfRent} onChange={(e) => setTotalNumberOfRents(parseInt(e.target.value))} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleSave}>
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}