import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup(props){
    const[credentials,setCredentials]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    });
    let history=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password,cpassword}=credentials;
        const response =await fetch("http://localhost:5000/api/auth/createuser",{
            
            method:"POST",
            headers:{
                'Content-type':'application/json',
                'Access-Control-Allow-Origin':'*',
            },
            body:JSON.stringify({name,email,password})
        })
        const json=await response.json()
        console.log(json);
        
        
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history("/");
            props.showAlert("Account Created Successfully","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }

    }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})

    }

    return(
        <div className="contanier mt-2">
            
            <h2>Create an account to use myNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onchange}/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" name="email"aria-describedby="emailHelp" onChange={onchange}/>
                
            </div>
            <div className="mb-3"><label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"  name="password" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3"><label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword"  name="cpassword" onChange={onchange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}
export default Signup