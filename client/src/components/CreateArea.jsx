import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";
import { useAuth } from "../context/auth";




const CreateArea = (props) => {

  const [auth] = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const submitNote = async (e) => {

    e.preventDefault();

    try {

      if (auth?.token) {
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/note/create-note`, { title: note.title, content: note.content });
        if (data.success) {
          alert(data.message);
          props.onAdd(note);
          setNote({
            title: "",
            content: ""
          });
          setIsExpanded(false);
        } else {
          alert(data.message)
        }
      } else {
        props.onAdd(note);
        setNote({
          title: "",
          content: ""
        });
        setIsExpanded(false);
      }

    } catch (error) {
      console.log('something went wrong');

    }

  }

  const expand = () => {
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (<input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />)}
        <textarea
          onChange={handleChange}
          onClick={expand}
          name="content"
          placeholder="Take a note..."
          value={note.content}
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
