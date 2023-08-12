const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const JWT_SECRET='Goodgi$rl';
const jwt=require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');


//Route 1: create user using POST /api/auth/createuser .no login  required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    //if there are errors ,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //check whether with his email exits already
   
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({sucess,error:"Sorry"})
    }
    const salt =await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt)
    //create a new user
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken= jwt.sign(data,JWT_SECRET);
     // res.json(user)
     success=true;
    res.json({success,authtoken})
  


})

//Route 2:authenticate a new user using POST /api/auth/login
router.post('/login', [
   
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
    
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success=false
            return res.status(400).json({error:"please try to login with correct credentials"});
        }
        const passCompare=await bcrypt.compare(password,user.password);
        if(!passCompare){
            success=false
            res.status(400).json({success,error:"please try to login with correct credentials password"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken= jwt.sign(data,JWT_SECRET);
        success=true
        res.json({success,authtoken})
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
})

//Route 3:Get  loged in user detail using POST /api/auth/getuser .login  required
router.post('/getuser',fetchUser, async (req, res) => {
try{
    const userId=req.user.id;
    const user=await user.findById(userId).select("-password")
    res.send(user)
}
catch(error){
    res.status(500).send("Internal Server Error");
}
})

module.exports = router
