import React, {FC, useRef, useState} from 'react';
import {useFetchNotesQuery, useCreateNoteMutation, useUpdateNoteMutation, useRemoveNoteMutation} from "../store/notesService";
import NotesItem from "./NotesItem";
import {FireBaseData, INote} from "../interfaces";
import Loader from "./Loader";

const NotesContainer: FC = () => {
    const {data = {}, isLoading, error} = useFetchNotesQuery();
    const [title, setTitle] = useState('');
    const [addNote] = useCreateNoteMutation();
    const [editNote] = useUpdateNoteMutation();
    const [removeNote] = useRemoveNoteMutation();
    const textInputRef = useRef<HTMLInputElement>(null);

    const transformObjToArr = (obj: FireBaseData): INote[] => {
        return obj ? Object.entries(obj).map((el, i) => {
            return {...el[1], id: i + 1, firebaseId: el[0]};
        }) : [];
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const note = {body: title, date: new Date().toString()} as INote;
        await addNote(note);
        setTitle('');
    };

    const handleUpdate = async (el: INote) => {
        await editNote(el);
    };

    const handleRemove = async (el: INote) => {
        await removeNote(el);
    };

    return (
        <>
            <form onSubmit={handleAdd}>
                <input ref={textInputRef} type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Введите название заметки...'/>
            </form>
            <ul className='notes'>
                {isLoading && <Loader />}
                {error && <p style={{color: 'red'}}>alas...</p>}
                {transformObjToArr(data).map(el => <NotesItem key={el.firebaseId} note={el} update={handleUpdate} remove={handleRemove} />)}
            </ul>
        </>
    );
};

export default NotesContainer;
