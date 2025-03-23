import {userCollection} from "../repository/userCollection";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {Request, Response} from "express";

const login = async (req: Request, res: Response) => {

    const findUser = await userCollection.getUserByEmail(req.body.email);
    if (!findUser) {
        res.status(401).json({message: "Invalid email or password"});
        return;
    }

    const isMatch = await bcrypt.compare(req.body.password, findUser.password);
    if (!isMatch) {
        res.status(401).json({message: "Invalid email or password"});
        return;
    }

    const token = jwt.sign(
        { id: findUser.id, email: findUser.email, role: findUser.role },
        'EbuddyAkhmadMaknur2014!',
        { expiresIn: '1d' }
    );

    res.status(200).json({message: "Login success", data: {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
        role: findUser.role,
        token
    }});
}

export const authController = {
    login
};