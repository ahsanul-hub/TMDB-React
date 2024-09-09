import { useState, useEffect } from "react";
import { Movie } from "../App";

import { getMovieTopRated } from "../api";
import "react-toastify/dist/ReactToastify.css";
import Movies from "./Movies";
interface Props {
  movies: Movie[];
}

export const imageURL = "https://image.tmdb.org/t/p/w500";

const Home: React.FC<Props> = ({ movies }) => {
  const [topMovies, setTopMovies] = useState<Movie[] | null>([]);

  const fetchMovieTopRated = async () => {
    const data = await getMovieTopRated();
    setTopMovies(data);
  };

  useEffect(() => {
    fetchMovieTopRated();
  }, []);

  return (
    <div className="py-4 px-8 gap-6">
      <Movies movies={movies} isSlider={true} title="Now Playing" />
      <Movies movies={topMovies as Movie[]} title="Top Rated" />
    </div>
  );
};

export default Home;
