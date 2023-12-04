const express = require('express'); 
const colors = require('colors');   // add colors to console log for better readability
const dotenv = require('dotenv').config();  //configure environment variables
const { errorHandler } = require('./middleware/errorMiddleware'); //importing custom error middleware
const connectDB = require('./config/db'); // connect database
const cors = require('cors'); 

const corsOptions = {              // removing cors error for browers
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent from the frontend
  };

connectDB();
const app = express();
const port = process.env.port || 5000;

app.use(express.json());  //built in express middleware to parse incoming JSON in req body
app.use(express.urlencoded({ extended: false }));  //built in express middleware to parse URL-encoded data in req body
app.use(cors(corsOptions));
app.use('/api/users', require('./routes/userRoutes')); //for all /api/users requests, it will go userRoutes instead


app.use(errorHandler);

app.listen(port, ()=> {
    console.log(("listening on port " + port).cyan);
})


