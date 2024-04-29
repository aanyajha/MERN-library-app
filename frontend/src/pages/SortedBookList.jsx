// SortedBookList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

const SortedBookList = () => {
  const [sortedBooks, setSortedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/books/report')
      .then((response) => {
        const data = response.data;
        const sortedBookList = [];

        // Flatten the grouped books into a single array
        for (const author in data) {
          sortedBookList.push(...data[author]);
        }

        setSortedBooks(sortedBookList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Sorted Book List</h2>
          <ul>
            {sortedBooks.map((book) => (
              <li key={book._id}>
                <div className="border-2 border-gray-400 p-4 mb-4 rounded-md">
                  <h3 className="text-xl font-bold">{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Publish Year: {book.publishYear}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortedBookList;