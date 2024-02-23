require('dotenv').config();
require('express-async-errors');

const express= require('express');
const app = express();

// Database
const connectDB=require('./db/connect');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

// Routes
const userRoutes= require('./routes/userRoutes');

// all other requirements
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan('tiny'));

app.get('/',(req,res)=>{
    res.send("Food-delivery-API");
})

app.use('/api/auth',userRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port= process.env.PORT || 5000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to database");
        app.listen(port,()=>console.log(`Succesfully listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();
