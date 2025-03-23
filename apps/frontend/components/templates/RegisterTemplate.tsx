import {Box, Container, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import iconEbuddy from '../../public/ebuddy.svg';
import RegisterForm from "../organisms/RegisterForm";

export default function RegisterTemplate() {
    return (
        <Container sx={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth={"xl"}>
            <Box sx={{
                borderRadius: 5,
                bgcolor: '#f5f5f5',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 5
            }}>
                <Grid container spacing={2}>
                    <Grid size={{
                        lg:12,
                    }} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Typography variant={"h6"} component="h1" gutterBottom sx={{
                            marginBottom: 3,
                            textAlign: 'center',
                        }}>
                            Register to Ebuddy
                        </Typography>
                        <RegisterForm/>
                    </Grid>
                </Grid>

            </Box>
        </Container>
    );
}