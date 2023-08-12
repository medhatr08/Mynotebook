import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Userlogin(props){
    const[credentials,setCredentials]=useState({
        email:"",
        password:""
    });
    let history=useNavigate();
   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response =await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                'Content-type':'application/json',
                'Access-Control-Allow-Origin':'*',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json=await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history("/");
            props.showAlert("Logged in Successfully","success")
        }
        else{
            props.showAlert("Invalid Details","danger")
        }

    }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})

    }
    return(
        <div className="mt-2">
            <h2>Login to continue to myNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp"/>
                    
                </div>
                <div className="mb-3"><label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onchange}  name="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Userlogin