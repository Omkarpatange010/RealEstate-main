const express = require('express');
const router = express.Router();
const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtAuthMiddleware, generateToken } = require('../Middleware/auth');




// // POST request to register a new user
// router.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;

//     // Check if all required fields are provided
//     if (!name || !email || !password || !role) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
//         // Hash the password
//         const salt = await bcrypt.genSalt(10); // Generate a salt
//         const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

//         // Create a new user instance
//         const userRegister = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role
//         });

//         // Save the user to the database
//         await userRegister.save();

//         // Respond with a success message
//         return res.status(201).json(userRegister);

//     } catch (error) {
//         // Handle duplicate email error
//         if (error.code === 11000) {
//             return res.status(400).json({ message: 'Email already registered.' });
//         }

//         console.error('Error registering user:', error);
//         return res.status(500).json({ message: 'Server error.' });
//     }
// });

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRegister = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await userRegister.save();
    // console.log(userRegister);
    
    return res.status(201).json(userRegister);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;
    console.log("req.body", req.body);

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const userLogin = await User.findOne({ email });
        console.log("userLogin", userLogin);

        // If no user is found or password is incorrect, return an error
        if (!userLogin || !(await bcrypt.compare(password, userLogin.password))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create the payload for the JWT
        const payload = {
            id: userLogin._id, // Use _id or id (depending on your model)
            email: userLogin.email,
            role: userLogin.role,
        };

        // Generate JWT token
        const token = generateToken(payload);
        console.log("Token is :", token);

        // Respond with the token
        res.status(200).json({ token,role: userLogin.role });

    } catch (error) {
        console.error(`Error in login: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get all users (protected route)
router.get('/getallUser', jwtAuthMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        console.log("getallUser", users);
        res.status(200).json(users);
    } catch (error) {
        console.error("error :", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
