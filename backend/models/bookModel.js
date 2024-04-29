// bookModel.js
import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BookReview' }],
  },
  {
    timestamps: true,
  }
);

// Create a compound index on publishYear and author fields
bookSchema.index({ publishYear: 1, author: 1 });

export const Book = mongoose.model("Book", bookSchema);