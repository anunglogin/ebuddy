'use client';

import {
    Box,
    Button,
    Dialog,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import { User } from "@repo/interfaces/user";
import {DeleteOutlineTwoTone, EditOutlined} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {setModal, setUser} from "../../store/actions";
import HomeEdit from "../molecules/HomeEdit";

export default function HomeTable() {
    const [rows, setRows] = useState<User[]>([]);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await fetch('/apis/users', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer test',
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                console.error(data.message);
                return;
            }
            setRows(data);
        } catch (e) {
            console.error(e);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/apis/users?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer test',
                    'Content-Type': 'application/json',
                },
            });
            const {message} = await response.json();
            if (!response.ok) {
                alert(message);
                return;
            }
            alert('Success to delete');
            fetchData();
        } catch (e) {
            alert('Failed to delete '+e);
        }
    }

    const handleEdit = (id: string) => {
        dispatch(setModal(true));
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: 2,
            }}>
                <Button variant={"contained"} onClick={() => {
                    dispatch(setUser('asasasas'));
                }}>Add</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Action</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Average Weight Ratings</TableCell>
                            <TableCell>Number Of Rents</TableCell>
                            <TableCell>Recently Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    width: 100,
                                }}>
                                    <Button variant={"text"} size={"small"} onClick={() => handleEdit(row.id)}>
                                        <EditOutlined />
                                    </Button>
                                    <Button variant={"text"} size={"small"} onClick={() => handleDelete(row.id)}>
                                        <DeleteOutlineTwoTone />
                                    </Button>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.totalAverageWeightRatings}</TableCell>
                                <TableCell>{row.numberOfRents}</TableCell>
                                <TableCell>{row.recentlyActive}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <HomeEdit/>

        </Box>
    );
}