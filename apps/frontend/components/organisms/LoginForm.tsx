'use client';

import Input from "../atoms/Input";
import {useState} from "react";
import InputPassword from "../atoms/InputPassword";
import {Button, Stack} from "@mui/material";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Stack spacing={2}>
            <Input
                label={"Username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={"Enter Your Username"}
            />
            <InputPassword
                label={"Password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder={"Enter Your Password"}
            />
            <Button
                onClick={() => console.log("Login")}
                variant={"contained"}
                color={"primary"}
            >Login</Button>
        </Stack>
    );
}