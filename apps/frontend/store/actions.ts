import {createAction} from "@reduxjs/toolkit";

export const setToken = createAction<string>('auth/setToken');
export const clearToken = createAction('auth/clearToken');

export const setUser = createAction<string>('user/setUser');
export const clearUser = createAction('user/clearUser');

export const setModal = createAction<{ openAdd: boolean, openEdit: boolean, data: string }>('modal/setModal');
export const clearModal = createAction('modal/clearModal');