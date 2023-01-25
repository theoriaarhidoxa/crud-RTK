export interface INote {
    id: number;
    firebaseId: string;
    date: string;
    body: string;
}

export interface NotesItemProps {
    note: INote;
    update: (note: INote) => void;
    remove: (note: INote) => void;
}

export interface FireBaseData { [key: string]: INote; }
