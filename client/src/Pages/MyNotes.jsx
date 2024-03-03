
import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/auth";
import axios from "axios";

const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const [auth] = useAuth()

    const getAllNotes = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/note/get-notes`);
            setNotes(data?.notes)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) getAllNotes();
    }, [auth?.token])

    const addNote = (newNote) => {
        if (auth?.token) {
            getAllNotes();
        }

    }

    const deleteNote = async (id) => {


        try {
            if (auth?.token) {
                await axios.delete(`${process.env.REACT_APP_API}/api/v1/note/delete-note/${id}`)
                getAllNotes();
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (
                    <Note key={index} id={index} title={noteItem.title} content={noteItem.content} onDelete={() => deleteNote(noteItem._id)} />
                );
            })}
            <Footer />
        </div>
    );
}

export default MyNotes