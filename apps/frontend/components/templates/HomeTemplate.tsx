'use client';

import HomeTable from "../organisms/HomeTable";
import {Container, Typography} from "@mui/material";

export default function HomeTemplate() {
  return (
    <Container>
        <Typography variant={"h6"}>
            Hello, Welcome Back
        </Typography>
        <HomeTable/>
    </Container>
  );
}