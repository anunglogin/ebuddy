'use client';

import Input from "../atoms/Input";
import {useState} from "react";
import InputPassword from "../atoms/InputPassword";
import {Button, Stack, Typography} from "@mui/material";
import {useRouter} from "next/navigation";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            if (username === "" || password === "" || name === "") {
                setError("Username and Password must be filled");
                return;
            }

            const response = await fetch('/apis/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password, name}),
            });
            const {message} = await response.json();
            if (!response.ok) {
                setError(`${message}`);
                return;
            }
            setError(message);
            router.push('/auth');

        } catch (e) {
            setError('Failed to login '+e);
        }
    }

    return (
        <Stack spacing={2}>
            <Input
                label={"Name"}
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                    setError("")
                }}
                placeholder={"Enter Your Name"}
            />
            <Input
                type={"email"}
                label={"Username"}
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                    setError("")
                }}
                placeholder={"Enter Your Username"}
            />
            <InputPassword
                label={"Password"}
                value={password} onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                }}
                placeholder={"Enter Your Password"}
            />
            <Button
                onClick={handleLogin}
                variant={"contained"}
                color={"primary"}
            >Register</Button>
            <Typography variant="caption" gutterBottom sx={{ display: error ? 'block' : 'none' , textAlign:"center" }} color={"error"}>
                {error}
            </Typography>
            <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                Already have an account? <a href={"#"} onClick={() => {
                    router.push('/auth');
            }}>Login</a>
            </Typography>
        </Stack>
    );
}