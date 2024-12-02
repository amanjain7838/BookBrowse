import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const BookSearchApp = ({
  query,
  setQuery,
  handleSearch,
  pagination,
  setPagination,
  results,
  stats,
  handlePageClick,
}) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleDescription = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };
  
    return (
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <h1>Google Books Search</h1>
        </header>
  
        {/* Search Form */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          <select
            value={pagination.perPage}
            onChange={(e) =>
              setPagination((prev) => ({ ...prev, perPage: +e.target.value }))
            }
            className="pagination-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
  
        {/* Results */}
        <div className="results-container">
          {results.map((book, index) => (
            <div
              key={index}
              className={`result-item ${expandedIndex === index ? "expanded" : ""}`}
              onClick={() => toggleDescription(index)}
            >
              <h2 className="result-title">
                {book.authors.join(", ")} - {book.title}
              </h2>
              {expandedIndex === index && (
                <p className="result-description">
                  {book.description || "This book does not have a description. Imagine the story it could tell!"}
                </p>
              )}
            </div>
          ))}
        </div>
  
        {/* Statistics */}
        <div className="statistics-container">
          <h3>Statistics</h3>
          <p>Total Results: {stats?.totalResults}</p>
          <p>Most Common Author: {stats?.mostCommonAuthor}</p>
          <p>Earliest Publication: {stats?.earliestPublication}</p>
          <p>Latest Publication: {stats?.latestPublication}</p>
          <p>Response Time: {stats?.responseTime} ms</p>
        </div>
  
        {/* Pagination */}
        <div className="pagination-container">
          <ReactPaginate
            pageCount={Math.ceil(stats?.totalResults / pagination.perPage) || 0}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    );
};

export default BookSearchApp;
