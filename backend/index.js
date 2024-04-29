import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';


const app = express();
app.use(express.json());

app.use(cors());

app.get('/',(request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN app')
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(() => {
     console.log('App is connected to database');
     // Rebuild indexes after connecting to the database
    Book.ensureIndexes()
    .then(() => {
      console.log("Indexes rebuilt successfully");
    })
    .catch((err) => {
      console.error("Failed to rebuild indexes:", err);
    });
     const server = app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch ((error) => {
 console.log(error);
})
