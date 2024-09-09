import { Movie } from "../App";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api";
import dayjs from "dayjs";
import FavoriteOn from "../assets/FavoriteOn";
import { useWatchlist } from "../context/WatchlistContext";
import { useFavorite } from "../context/FavoriteContext";
import Favorite from "../assets/Favorite";
import WatchlistOn from "../assets/WatchlistOn";
import Watchlist from "../assets/Watchlist";
import Movies from "./Movies";
import { getRecommendations } from "../api";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export const imageURL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>();
  const [movieRecommendations, setMovieRecommendations] = useState<Movie[]>();
  const { isFavorite, toggleFavorite } = useFavorite();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const fetchMovies = async () => {
    const data = await getMovieDetail(Number(id));
    setMovie(data);
  };

  const fetchRecommendations = async () => {
    const data = await getRecommendations(Number(id));
    setMovieRecommendations(data);
  };

  const calculateTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    fetchMovies();
    fetchRecommendations();
  }, []);

  return (
    <div>
      <div
        className={` h-[400px] w-full flex bg-opacity-25 items-center px-[142px] overflow-hidden text-white shadow-lg bg-blue-gray-500 shadow-blue-gray-500/40`}
        style={{
          backgroundImage: `url(${imageURL}${movie?.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {movie && (
          <div className="flex gap-4">
            <img
              className="w-[200px] h-[300px] rounded-md"
              src={`${imageURL}${movie?.backdrop_path}`}
              alt="card-image"
            />
            <div className=" ">
              <span className="flex items-center gap-2">
                <span className="text-[32px] font-bold">{movie?.title}</span>
                <span className="text-[32px] ">{`(${dayjs(
                  movie?.release_date
                ).format("YYYY")})`}</span>
              </span>
              <div>
                <span>{dayjs(movie?.release_date).format("DD/MM/YYYY")}</span>
                <span className="px-2">•</span>
                <span>{movie?.genres}</span>
                <span className="px-2">•</span>
                <span>{calculateTime(Number(movie?.runtime))}</span>
              </div>
              <div className="flex gap-2">
                <span
                  className="my-6 cursor-pointer"
                  onClick={() => toggleWatchlist(movie)}
                >
                  {isInWatchlist(movie.id) ? <WatchlistOn /> : <Watchlist />}
                </span>
                <span
                  className="my-6 cursor-pointer"
                  onClick={() => toggleFavorite(movie)}
                >
                  {isFavorite(movie.id) ? <FavoriteOn /> : <Favorite />}
                </span>
              </div>
              <div className="italic">{movie.tagline}</div>
              <div className="flex flex-col mt-3">
                <span className="font-bold">Overview</span>
                <span>{movie.overview}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-6 mt-6">
        {movieRecommendations && (
          <Movies movies={movieRecommendations} title="Recomendations" />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
