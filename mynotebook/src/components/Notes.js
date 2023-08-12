import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    const context = useContext(noteContext);
    let history=useNavigate();
    const { notes, getNotes,editNote } = context

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            history("/login")
        }
    }, [])
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentNote) => {
        console.log(currentNote);
        ref.current.click();
        console.log(currentNote);
        setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
    }
    const handleClick=(e)=>{
        e.preventDefault();
        editNote(note.id, note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully","success")
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }


    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" name="edescription" id="edescription" onChange={onchange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" name="etag" id="etag" onChange={onchange} value={note.etag} />

                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>Your Notes</h1>
                <div className="container">
                {notes.length==0&&"No notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}
export default Notes