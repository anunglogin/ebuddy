import {User} from "../entities/user";
import {db} from "../config/firebaseConfig";
import { v7 as uuidv7 } from 'uuid';
import {userController} from "../controller/api";
import * as bcrypt from 'bcrypt';

const users: User[] = [];

export const userCollection = {
    addUser: async (user: User) => {
        const finduser = await db.collection('users').where('email', '==', user.email).get();
        if (finduser.size > 0) {
            return false;
        }

        user.id = uuidv7()
        user.created_at = new Date();
        user.updated_at = new Date();
        user.password = await bcrypt.hash(user.password, 10);
        users.push(user);
        await db.collection("users").doc(user.id).set(user);
        return user;
    },
    getUserById: async (id: string) => {
        const findUser = await db.collection('users').doc(id).get();
        if (!findUser.exists) {
            return false;
        }
        return findUser.data();
    },
    getAllUsers: async (): Promise<User[]> => {
        const users: User[] = [];
        await db.collection("users").orderBy("created_at","desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as User);
            });
        });
        return users;
    },
    updateUser: async (id: string, updatedUser: Partial<User>) => {
        const findUser = await db.collection('users').doc(id).get();
        if (!findUser.exists) {
            return false;
        }

        if (updatedUser.email) {
            const findUser = await db.collection('users').where('email', '==', updatedUser.email).get();
            if (findUser.size > 0 && findUser.docs[0].id !== id) {
                return false;
            }
        }

        updatedUser.updated_at = new Date();

        await db.collection('users').doc(id).set({...findUser.data(), ...updatedUser}, {merge: true});

        return {...findUser.data(), ...updatedUser};
    },
    deleteUser: async (id: string) => {
        const findUser = await db.collection('users').doc(id).get();
        if (!findUser.exists) {
            return false;
        }

        await db.collection('users').doc(id).delete();
        return true;
    }
};