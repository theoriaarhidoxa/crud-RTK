import {configureStore} from "@reduxjs/toolkit";
import {notesApi} from "./notesService";

const rootReducer = {
    [notesApi.reducerPath]: notesApi.reducer
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(notesApi.middleware)
});
