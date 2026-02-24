require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userSchema'); // Adjust according to your file structure
const bcrypt = require('bcryptjs');
const authRouter = require('./Routers/authRouter')
const propertyRoutes = require('./Routers/mainRoute')
const dashboardRoutes = require('./Routers/buyer&seller')
const multer = require('multer'); // Import Multer
const path = require('path'); // To manage file paths
// const Property = require('./Models/propertySchema');
// const conversationRoutes = require('./Routers/ConversationRoutes')
const intBuyerRouter = require('./Routers/interested')

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4000',
  credentials: true
}));  // This will enable CORS for all routes
app.use(express.json());

// Root route — optional but useful to test server
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// app.use(express.urlencoded({extended:false}))

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/RealEstate';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

  app.use('/userApi', authRouter);
  app.use('/propApi', propertyRoutes);
  app.use('/dashboardApi', dashboardRoutes)
  app.use('/intBuyerRouterApi', intBuyerRouter)
  // app.use('/msgApi', conversationRoutes)
  
  // Serve Static Files (Uploaded Images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Specify the folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);  // Generate a unique filename
  },
});
const upload = multer({ storage });

// Image Upload Endpoint (Single File)
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const imagePath = `/uploads/${req.file.filename}`;  // Get the path of the uploaded file
    console.log(imagePath);
    res.status(200).json({ imagePath });  // Send back the image path as response
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
