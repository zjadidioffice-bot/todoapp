const bcrypt=require("bcryptjs");
const User=require("../models/User");
const jwt=require("jsonwebtoken");
const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});        

        if(existingUser){
            return res.status(404).json({
                message:"user alredy exists",
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });

        return res.status(201).json({
            message:"user registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    } catch (error) {
     res.status(500).json({
        message:"error registering user",
     });   
    }
};

const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
        {return res.status(400).json({
            message:"invalid email or pass"
        });
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Invalid email or password"
        });
    }
    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
        
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    } catch (error) {
        res.status(500).json({
      message: "Error logging in",
    });
  
    }
}

module.exports={
    registerUser,
    loginUser
};