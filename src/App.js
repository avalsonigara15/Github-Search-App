import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://api.github.com/users/${searchQuery}/repos`
      );

      setRepositories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortRepositories = () => {
    const sortedRepositories = [...repositories];

    if (sortOption === "stars") {
      sortedRepositories.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
    } else if (sortOption === "forks") {
      sortedRepositories.sort((a, b) => b.forks_count - a.forks_count);
    }

    setRepositories(sortedRepositories);
  };

  return (
    <div className="container">
      <h1 className="title">Github Search App</h1>
      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter a GitHub username"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="sort-select"
      >
        <option value="">Sort by</option>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
      </select>
      <ul className="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id} className="repository-item">
            {repo.name}
          </li>
        ))}
      </ul>
      <button onClick={sortRepositories} className="sort-button">
        Sort
      </button>
    </div>
  );
};

export default App;
