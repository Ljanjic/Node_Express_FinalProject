const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');


const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token });
};
  
const login = async  (req, res) => {
    //initial checking
  const { email, password } = req.body;
  
  if(!email || !password){
    throw new BadRequestError('Please enter email address and password');
   }
   // checking user existence in DB, if user exist- we send back a response with a user name and token, if no- we send an (unauthenticated) error as user entered not valid credentials;
   const user = await User.findOne({ email })
   
   if(!user){
    throw new UnauthenticatedError('Login failed! You entered Invalid Credentials');
   };
   // comparing hashed passwords
   const isPasswordCorrect = await user.comparePassword(password);
   if(!isPasswordCorrect) {
    throw new  UnauthenticatedError('Login failed! You entered Invalid Credentials'); 
   };
   // creating token if user exist in DB
   const token = user.createJWT();
   res
   .status(StatusCodes.OK)
   .json({ user: { name: user.name }, token });

};
const logout = async (req, res) => {
    try {
      // Perform logout actions here (e.g., invalidate token, clear session)
  
      // For simplicity, let's assume you clear the session
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ error: 'Logout failed' });
        }
  
        res.json({ message: 'Logout successful' });
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Logout failed' });
    }
  };
  
  module.exports = { register, login, logout };
  
module.exports = {
    register,
    login,
    logout
};

