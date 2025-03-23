import {createReducer} from "@reduxjs/toolkit";
import {clearToken, setToken} from "./actions";

export interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null,
};

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setToken, (state, action) => {
            state.token = action.payload;
        })
        .addCase(clearToken, (state) => {
            state.token = null;
        })
});

export default authReducer;