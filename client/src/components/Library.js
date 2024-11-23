import React from 'react';
import './Library.css';

const Library = () => {
  return (
    <div className="library-container">
      <h1 className="library-title">Online Library</h1>
      <p className="library-description">
        Discover free and trusted online resources for learning and personal growth.
      </p>
      <div className="book-grid">
        {/* Book 1 */}
        <div className="book-card">
          <a href="https://www.gutenberg.org/" target="_blank" rel="noopener noreferrer">
            Project Gutenberg
          </a>
          <p className="book-description">
            Access over 60,000 free eBooks, from classic literature to modern works.
          </p>
        </div>
        {/* Book 2 */}
        <div className="book-card">
          <a href="https://archive.org/details/texts" target="_blank" rel="noopener noreferrer">
            Internet Archive
          </a>
          <p className="book-description">
            Explore millions of free books, videos, and other digital media.
          </p>
        </div>
        {/* Book 3 */}
        <div className="book-card">
          <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer">
            Google Scholar
          </a>
          <p className="book-description">
            Search for academic articles, theses, and scholarly books.
          </p>
        </div>
        {/* Book 4 */}
        <div className="book-card">
          <a href="https://www.openlibrary.org/" target="_blank" rel="noopener noreferrer">
            Open Library
          </a>
          <p className="book-description">
            Borrow free eBooks from an ever-growing online collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Library;