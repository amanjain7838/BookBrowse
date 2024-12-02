import React, { useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import BookSearchApp from "./BookSearchApp";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({ page: 0, perPage: 10 });

  const handleSearch = async () => {
    const { page, perPage } = pagination;
    const startIndex = page * perPage;

    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/v1/api/books`, {
        params: { q: query, start: startIndex, limit: perPage },
      });

      setResults(res.data.books);
      setStats(res.data.statistics);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageClick = (event) => {
    setPagination((prev) => ({ ...prev, page: event.selected }));
    handleSearch();
  };

  return (
    <div>
    <BookSearchApp
      query={query}
      setQuery={setQuery}
      results={results}
      pagination={pagination}
      setPagination={setPagination}
      handleSearch={handleSearch}
      handlePageClick={handlePageClick}
      stats={stats}
    />
  </div>

  );
};

export default App;
