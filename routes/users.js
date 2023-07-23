const express = require('express')
const router = express.Router()
const {User,validate} =require('../model/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')

router.get('/', (req,res)=>{
    res.send('Users')
})


router.post('/',async (req,res)=>{
    const {error}=validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('User already registered')

    user = new User(_.pick(req.body, ['firstName','lastName', 'email','phone', 'password' ]))
    const salt = await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password, salt)
    user.save()

    res.send(user)
    
})




module.exports= router