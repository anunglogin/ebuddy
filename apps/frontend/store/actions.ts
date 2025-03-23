import {createAction} from "@reduxjs/toolkit";

export const setToken = createAction<string>('auth/setToken');
export const clearToken = createAction('auth/clearToken');