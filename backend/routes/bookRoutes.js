import express from "express";
import { Book } from "../models/bookModel.js";
import { BookReview } from "../models/bookReview.js";

const router = express.Router();

//Route to save a new book
router.post('/', async(request, response) => {
    try  {
       if (
           !request.body.title ||
           !request.body.author ||
           !request.body.publishYear
       ) {
           return response.status(400).send({
               message: 'Input all required fields: title, author, and pulishYear',
           });
       }
       const newBook = {
           title: request.body.title,
           author: request.body.author,
           publishYear: request.body.publishYear,
       };

       const book =  await Book.create(newBook);
       return response.status(201).send(book);

    } catch(error) {
       console.log(error.message);
       response.status(500).send({ message : error.message});
    }
});

//Get all books from database
router.get('/', async (request, response) => {
   try{
       const books = await Book.find({});
       return response.status(200).json({
           count: books.length,
           data: books
       }
       );
   } catch (error) {
       console.log(error.message);
       response.status(500).send({message: error.message});
   }
});

// Route to generate a report of books grouped by author and sorted by publish year
router.get('/report', async (req, res) => {
    try {
      const books = await Book.find({}).sort({ author: 1, publishYear: -1 });
      const groupedBooks = {};
  
      books.forEach((book) => {
        const author = book.author;
        if (!groupedBooks[author]) {
          groupedBooks[author] = [];
        }
        groupedBooks[author].push(book);
      });
  
      res.json(groupedBooks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });


//Get one book from database
router.get('/:id', async (request, response) => {
   try{

       const { id } = request.params;
       const book = await Book.findById(id);
       return response.status(200).json(book);
   } catch (error) {
       console.log(error.message);
       response.status(500).send({message: error.message});
   }
});

//Update a book using put command
router.put('/:id', async(request, response) => {
   try {
       if (
           !request.body.title ||
           !request.body.author ||
           !request.body.publishYear
       ) {
           return response.status(400).send({
               message: 'Input all required fields: title, author, and pulishYear',
           });
       }
       const { id } = request.params;
       const result = await Book.findByIdAndUpdate(id, request.body);
       if (!result) {
        return response.status(404).json({message : 'Book not in the database'});
    }
      return response.status(200).json(result); // Send the updated book data

   } catch (error){
       console.log(error.message);
       response.status(500).send({message : error.message});
   }
});

//Deleting a book
router.delete('/:id', async (request, response) => {
   try {
       const { id } = request.params;
       const result = await Book.findByIdAndDelete(id);
       if (!result) {
           return response.status(404).json({message : 'Book not in the database'});
       }
       return response.status(200).json({message: 'Book deleted Succesfully'});
   } catch (error) {
       console.log(error.message);
       response.status(500).send({message : error.message});
   }
})



// Route to add a review for a book
router.post('/:bookId/reviews', async (request, response) => {
    try {
      const { bookId } = request.params;
  
      const { review, rating } = request.body;
  
      const bookReview = await BookReview.create({
        bookId,
        review,
        rating
      });
  
      return response.status(201).json(bookReview);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route to get all reviews for a book
  router.get('/:bookId/reviews', async (request, response) => {
    try {
      const { bookId } = request.params;
  
      const reviews = await BookReview.find({ bookId });
  
      return response.status(200).json({
        count: reviews.length,
        data: reviews
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Get one book from the database along with its associated reviews
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id).populate('reviews');
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



export default router;