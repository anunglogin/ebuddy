import {TextField} from "@mui/material";

interface InputProps {
    type?: string;
    label: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    type = "text",
    label,
    value,
    onChange,
    placeholder,
}: Readonly<InputProps>) {
    return (
        <TextField
            type={type}
            label={label}
            onChange={onChange}
            variant={"outlined"}
            placeholder={placeholder}
            value={value}
        />
    );
}