require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'Radhika@123';

const jwtAuthMiddleware = (req,res,next) => {

//   const token = req.header('Authorization');
//   const bearerWord = token.split(" ")[0].trim();
//   const bearerToken = token.split(" ")[1];

//   if (bearerWord!= "Bearer"){
//     return res.status(403).json({ message: 'Invalid Header'});
//  } 
//  if(!bearerToken){
//     return res.status(401).json({message : 'No token, authorization denied'});   
//  } 

//   try {
//     // Verify the token using the secret
//     const decoded = jwt.verify(bearerToken, SECRET_KEY);
//     req.user = decoded;  // Attach the decoded user data to req.user
//     next();  // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.log(error);
    
//     return res.status(401).json({message : 'token is not valid'});
//   }

// const jwtAuthMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  
  // Ensure token exists before proceeding with split
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  const parts = token.split(" ");
  
  // Ensure the token is in the correct 'Bearer <token>' format
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(403).json({ message: 'Invalid header format' });
  }
  
  const bearerToken = parts[1].trim();  // Extract the token
  
  if (!bearerToken) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    // Verify the token using the secret
    const decoded = jwt.verify(bearerToken, SECRET_KEY); 
    req.user = decoded;  // Attach the decoded user data to req.user
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
// };

};

    const generateToken = (userData) => {
        console.log("userData", userData);

        if(!userData || typeof userData !== 'object'){
            throw new Error('Payload must be an object');
        }
        return jwt.sign(userData, SECRET_KEY, { expiresIn: '10h' });
    }

    module.exports = {jwtAuthMiddleware,generateToken};