
import React, { useState } from "react";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [auth] = useAuth();
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate()

    if (auth?.token) navigate('/my-notes')

    const addNote = (newNote) => {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });

    }

    const deleteNote = async (id) => {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            })
        })

    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (
                    <Note key={index} id={index} title={noteItem.title} content={noteItem.content} onDelete={() => deleteNote(index)} />
                );
            })}
            <Footer />
        </div>
    );
}

export default Home