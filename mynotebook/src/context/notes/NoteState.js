import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  // const s1={
  //     "name":"Harry",
  //     "class":"5b"
  // }
  // const[state,setState]=useState(s1);
  // const update=()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":"Larry",
  //             "class":"10b"
  //         })
  //     },1000);
  // }
  

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem('token')}

    });
    const json = await response.json();
    setNotes(json)
  }

  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note= await response.json();
    setNotes(notes.concat(note))
  }

    const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem('token')
      },
     
    });
    const json = response.json();
   

    const newNotes = notes.filter((note) => { return note._id != id })
    setNotes(newNotes);

  }
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });
    const json = await response.json();

    //Logic to edit in client
     let newnotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      // const element = notes[index];
      if (newnotes[index]._id == id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;

      }
 


    }
    setNotes(newnotes);
  }

  return (
    // <NoteContext.Provider value={{state,update}}>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;