// bookReview.js

import mongoose from "mongoose";

const bookReviewSchema = mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', // Reference to the Book model
      required: true
    },
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const BookReview = mongoose.model('BookReview', bookReviewSchema);
