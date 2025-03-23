import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

const store = configureStore({
    reducer: {
        auth: reducers.auth,
        user: reducers.user,
        modal: reducers.modal,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;