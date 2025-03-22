import LoginForm from "../organisms/LoginForm";
import {Box, Container, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import iconEbuddy from '../../public/ebuddy.svg';

export default function LoginTemplate() {
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
                        sm:12,
                        lg:8,
                        md:8,
                        xs:12,
                    }} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <Typography variant={"h6"} component="h1" gutterBottom sx={{
                            marginBottom: 3,
                            textAlign: 'center',
                        }}>
                            Welcome to Ebuddy
                        </Typography>
                        <LoginForm/>
                    </Grid>
                    <Grid size={{
                        lg:4,
                        md:4,
                    }} display={{
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                    }}>
                        <Image src={iconEbuddy} alt={"Ebuddy"} width={400} height={300} draggable="false"/>
                    </Grid>
                </Grid>

            </Box>
        </Container>
    );
}