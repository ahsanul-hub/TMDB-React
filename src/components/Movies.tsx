import { Movie } from "../App";
import { Link } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContext";
import { useWatchlist } from "../context/WatchlistContext";
import Favorite from "../assets/Favorite";
import FavoriteOn from "../assets/FavoriteOn";
import WatchlistOn from "../assets/WatchlistOn";
import Watchlist from "../assets/Watchlist";

import dayjs from "dayjs";

interface Props {
  movies: Movie[];
  title: string;
  isSlider?: boolean;
}

export const imageURL = "https://image.tmdb.org/t/p/w500";

const Movies: React.FC<Props> = ({ movies, title, isSlider }) => {
  const { isFavorite, toggleFavorite } = useFavorite();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLDivElement>,
    movie: Movie
  ) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(movie);
  };

  const handleWatchlistClick = (
    e: React.MouseEvent<HTMLDivElement>,
    movie: Movie
  ) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWatchlist(movie);
  };

  return (
    <div className="py-4">
      <div className="text-white text-5xl font-semibold">{title}</div>
      <div
        className={
          isSlider
            ? "grid grid-flow-col gap-2 mt-6 overflow-x-auto"
            : "grid grid-cols-6 gap-6 mt-6 items-center justify-center"
        }
      >
        {movies.length !== 0
          ? movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className="relative group h-[355px] flex flex-col text-gray-700 bg-[#050E12] shadow-md bg-clip-border rounded-lg !w-[194px]">
                  <div className="relative h-[290px] overflow-hidden text-white shadow-lg bg-clip-border rounded-xl rounded-b-none bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img
                      src={`${imageURL}${movie.poster_path}`}
                      alt="card-image"
                    />
                    <div
                      className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => handleFavoriteClick(e, movie)}
                    >
                      {isFavorite(movie.id) ? <FavoriteOn /> : <Favorite />}
                    </div>
                    <div
                      className="absolute bottom-3 right-9 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => handleWatchlistClick(e, movie)}
                    >
                      {isInWatchlist(movie.id) ? (
                        <WatchlistOn />
                      ) : (
                        <Watchlist />
                      )}
                    </div>
                  </div>

                  <div className="py-2 px-3 h-[60px]">
                    <p className="line-clamp-1 font-sans text-lg font-semibold text-white">
                      {movie.title}
                    </p>
                    <span>{dayjs(movie.release_date).format("YYYY")}</span>
                  </div>
                </div>
              </Link>
            ))
          : []}
      </div>
    </div>
  );
};

export default Movies;
