import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        console.log(note);
        addNote(note.title,note.description,note.tag);
       
        props.showAlert("Added Successfully","success")

    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
    return (

        <div className="container my-3">
            <h1>Add a Note</h1>
            
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name="description" id="description" onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                    <label className="form-label" htmlFor="tag">Tag</label>
                        <input type="text"  className="form-control" name="tag" id="tag" onChange={onchange}/>
                        
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>

                </form>
           
        </div>

    )
}
export default AddNote;