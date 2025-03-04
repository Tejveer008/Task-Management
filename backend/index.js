const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // To store sessions in MongoDB
const connectDB = require('./Models/db');
const AuthRouter = require('./routes/authRoutes');
const passport = require('passport');

// require('./config/passport'); // Include passport strategies
require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET || '111'; // Use a strong secret key

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set up session middleware
app.use(
  session({
    secret: SESSION_SECRET, // Secret key to sign the session ID cookie
    resave: false, // Don't save session if it wasn't modified
    saveUninitialized: false, // Don't create session until something is stored
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL, // Store sessions in MongoDB
      ttl: 24 * 60 * 60 // 1 day session expiration
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
      httpOnly: true, // Protects cookies from being accessed by client-side scripts
    }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', AuthRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
