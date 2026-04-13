const User= require('../models/User');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');

exports.register = async (req,res)=>{
    try{
        const {username,password,role}= req.body;
        const user= new User({username,password,role});

        await user.save();
       
        res.status(201).json(
            {
                success: true,
                message: "User created successfully!"
            }
        );
    }
    catch(error){
     res.status(400).json({
        success: false,
        message: error.message,
     });
    }
};

exports.login = async (req,res) =>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }
        
        const token= jwt.sign(
            { id: user._id, role: user.role},
            process.env.JWT_SECREt,
            {expiresIn: '1h'}
        );

        res.json({
            success: true,
            token: token,
            user: {username: user.username, role: user.role}
        });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};