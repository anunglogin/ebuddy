import {NextFunction, Request, Response} from "express";
import { userCollection } from "../repository/userCollection";

const add = async (req: Request, res: Response) => {
    const newUser = req.body;
    const users = await userCollection.addUser(newUser);
    if (!users) {
        res.status(409).json({ message: "Email already exist" });
        return;
    }
    res.status(201).json({ message: "User created", data: newUser });
}

const getAll = async (req: Request, res: Response) => {
    const users = await userCollection.getAllUsers();
    res.json(users);
}

const getById = async (req: Request, res: Response) => {
    const user = await userCollection.getUserById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return
    }
    res.json(user);
}

const update = async (req: Request, res: Response) => {
    const updatedUser = await userCollection.updateUser(req.params.id, req.body);
    if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return
    }
    res.json({ message: "User updated", data: updatedUser });
}

const remove = async (req: Request, res: Response) => {
    const success = await userCollection.deleteUser(req.params.id);
    if (success) {
        res.status(200).send({ message: "User deleted" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

export const userController = {
    getAll,
    getById,
    add,
    update,
    remove
};