import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { getMoviePlaying, getSearchMovie } from "./api";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Watchlist from "./components/Watchlist";
import MovieDetail from "./components/MovieDetail";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: number;
  poster_path: string;
  tagline: string;
  genres: string;
  backdrop_path: string;
  runtime: number;
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie[] | null>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const searchMovie = async () => {
    if (searchValue.length > 0) {
      const data = await getSearchMovie(searchValue);
      setMovies(data);
    }
  };

  const fetchMovies = async () => {
    const data = await getMoviePlaying();
    setMovies(data);
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      if (searchValue) {
        searchMovie();
      }
    }, 500);
    setDebounceTimeout(timeout);
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchMovie();
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="w-full">
      <Navbar onChange={handleChange} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home movies={movies as Movie[]} />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
