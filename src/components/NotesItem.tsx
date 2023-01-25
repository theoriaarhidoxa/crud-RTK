import React, {FC, useEffect, useRef, useState} from 'react';
import {INote, NotesItemProps} from "../interfaces";

const NotesItem: FC<NotesItemProps> = ({note, remove, update}) => {
    const [editMode, setEditMode] = useState(false);
    const {id, body, date} = note;
    const inputRef = useRef<HTMLInputElement>(null);
    const [newTitle, setNewTitle] = useState(body);

    const updateNote = (e: React.FormEvent) => {
        e.stopPropagation();
        setEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const clickHandler = () => {
        setEditMode(false);
    };


    const handleEdit = (e: React.FormEvent) => {
        if (!editMode) {
            updateNote(e);
        } else {
            const obj = {...note, body: newTitle, date: new Date().toString()};
            update(obj);
            setEditMode(false);
        }
    };

    const handleRemove = (el: INote) => {
        remove(el);
    };

    useEffect(() => {
        window.addEventListener('click', clickHandler);
        return () => window.removeEventListener('keydown', clickHandler);
    }, [editMode]);

    return (
        <li className='notes__item'>
            <div className='notes__item-left'>
                <p>{id}.<input type='text' onClick={e => e.stopPropagation()} onChange={e => setNewTitle(e.target.value)} ref={inputRef} value={newTitle} disabled={!editMode}/></p>
            </div>
            <div className='notes__item-right'>
                <em className={editMode ? 'moved' : ''}>{date && date.substring(4, 21)}</em>
                <img className={editMode ? 'active' : ''} onClick={handleEdit} src={`/img/pencil.${editMode ? 'gif' : 'png'}`} alt='' />
                <span onClick={() => handleRemove(note)}>&times;</span>
            </div>
        </li>
    );
};

export default NotesItem;
