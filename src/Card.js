import React, { useEffect, useRef, useState } from 'react';
// import './card1.css'; // Make sure this CSS file exists

function Card1() {
  const PAGESIZE = 4; // ✅ Defined as a constant
  const [wholedata, setwholedata] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then((response) => response.json())
      .then((data) => {
        setwholedata(data);
        setData(data.slice(0, PAGESIZE)); // ✅ Using constant
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [PAGESIZE]); // ✅ Add PAGESIZE as dependency (fixes Netlify build)

  function nextPage() {
    const num = page + 1;
    if (num < wholedata.length / PAGESIZE) {
      setPage(num);
      const start = num * PAGESIZE;
      const end = start + PAGESIZE;
      setData(wholedata.slice(start, end));
    }
  }

  function prevPage() {
    const num = page - 1;
    if (num >= 0) {
      setPage(num);
      const start = num * PAGESIZE;
      const end = start + PAGESIZE;
      setData(wholedata.slice(start, end));
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = inputRef.current.value.trim();
    const filtered = wholedata.filter((user) =>
      user.login.toLowerCase().includes(query.toLowerCase())
    );
    setData(filtered);
    setPage(0); // Reset to first page of filtered results
    inputRef.current.value = '';
  }

  return (
    <div className="container">
      <h1>GitHub Users</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input type="text" placeholder="Search for a user..." ref={inputRef} />
        <button type="submit">Search</button>
      </form>

      <div className="card-container">
        {data.map((user, index) => (
          <div key={index} className="card">
            <img src={user.avatar_url} alt={user.login} />
            <h2>{user.login}</h2>
            <p>ID: {user.id}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage}>Previous</button>
        <span>Page: {page + 1}</span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default Card1;