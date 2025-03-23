'use client';

import Input from "../atoms/Input";
import {useState} from "react";
import InputPassword from "../atoms/InputPassword";
import {Button, Stack, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {setToken} from "../../store/actions";

export default function LoginForm() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            if (username === "" || password === "") {
                setError("Username and Password must be filled");
                return;
            }

            const response = await fetch('/apis/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(`${data.message}`);
                return;
            }
            setError(data.message);

            document.cookie = "isLogin=true; path=/";
            dispatch(setToken(data.data.token));

            window.location.href = "/";
        } catch (e) {
            setError('Failed to login '+e);
        }
    }

    return (
        <Stack spacing={2}>
            <Input
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
            >Login</Button>
            <Typography variant="caption" gutterBottom sx={{ display: error ? 'block' : 'none' , textAlign:"center" }} color={"error"}>
                {error}
            </Typography>
            <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                Don&#39;t have an account? <a href="/register">Register</a>
            </Typography>
        </Stack>
    );
}