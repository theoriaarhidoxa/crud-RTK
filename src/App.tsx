import './App.scss';
import React from 'react';
import NotesContainer from "./components/NotesContainer";

const App = () => {
    return (
        <div className="wrapper">
            <p>CRUD-шпаргалка по использованию RTK Query</p>
            <NotesContainer/>
        </div>
    );
};

export default App;
