// reducers.ts
import { createReducer } from '@reduxjs/toolkit';
import {clearModal, clearToken, clearUser, setModal, setToken, setUser} from './actions';

export interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

export interface UserState {
    name: string | null;
}

const initialUserState: UserState = {
    name: null,
};

export interface ModalState {
    modal: boolean;
}

const initialModal: ModalState = {
    modal: false,
}

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setToken, (state, action) => {
            state.token = action.payload;
        })
        .addCase(clearToken, (state) => {
            state.token = null;
        });
});

const userReducer = createReducer(initialUserState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.name = action.payload;
        })
        .addCase(clearUser, (state) => {
            state.name = null;
        });
});

const modalReducer = createReducer(initialModal, (builder) => {
    builder
        .addCase(setModal, (state, action) => {
            state.modal = action.payload;
        })
        .addCase(clearModal, (state) => {
            state.modal = false;
        });
});

export default {
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
};