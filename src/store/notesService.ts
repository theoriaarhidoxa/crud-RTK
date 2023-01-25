import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {INote} from "../interfaces";

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_DB_URL}),
    tagTypes: ['Note'],
    endpoints: build => ({
        fetchNotes: build.query<INote[], void>({
            query: () => ({
                url: `/notes.json`
            }),
            providesTags: res => ['Note']
        }),
        createNote: build.mutation<INote, INote>({
            query: (note: INote) => ({
                url: `/notes.json`,
                method: 'POST',
                body: note
            }),
            invalidatesTags: ['Note'],
        }),
        updateNote: build.mutation<INote, INote>({
            query: (note: INote) => ({
                url: `/notes/${note.firebaseId}.json`,
                method: 'PUT',
                body: note
            }),
            invalidatesTags: ['Note'],
        }),
        removeNote: build.mutation<INote, INote>({
            query: (note: INote) => ({
                url: `/notes/${note.firebaseId}.json`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Note'],
        })
    })
});

export const {useFetchNotesQuery, useCreateNoteMutation, useUpdateNoteMutation, useRemoveNoteMutation} = notesApi;
