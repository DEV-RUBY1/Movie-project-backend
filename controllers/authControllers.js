const User = require("../models/user")

const bcrypt =  require("bcryptjs") 

const jwt = require("jsonwebtoken")

const register = async (req, res)=>{
    try {
         const { email, password, repeatPassword } = req.body;

         if (password !== repeatPassword) {
           res.status(406).json({message: "Password Mismatch"})
         }

         const salt = await bcrypt.genSalt(10)
         const harshPassword = await bcrypt.hash(password, salt)

         const user = await User.create({ email, password: harshPassword });

         const token = jwt.sign({ userId:user.id }, process.env.JWT_SECRET, {expiresIn:"3d",})

         res.status(201).json({ message: "Registration was successful", user, token });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
  
}

//for sign in
const login = async(req, res)=>{
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

       if (!user) {
        res.status(401).json({message:"User does not exist"})
       }

       const isPasswordMatch = await bcrypt.compare(password, user.password)
       if (!isPasswordMatch) {
         res.status(401).json({message:"wrong password"})
       }
       
       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
         expiresIn: "3d",
       });

       res.status(200).json({message:"login was successful", user, token})
       

   } catch (error) {
       res.status(400).json({ error: error.message });
   }
}

// Controller to logout an existing user
const logout = async (req, res) => {
  try {
    // Since JWTs are stateless, we cant truly dete them on the backend
    // What we can do is simply tell the client to delete their copy
    // You can also implement token blacklisting if needed in the future

    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {}
};

// Controller To get all the registered users in the db and note that it works with the auth.js in the middleware
const getUser = (req, res) => {
  const { userId } = req.user;
  res.status(200).json({
    id: userId,
  });
}
module.exports = {register, login, logout, getUser}