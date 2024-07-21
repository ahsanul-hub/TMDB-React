import { useState, useEffect } from "react";
import { Movie } from "../App";
import { imageURL } from "./Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Favorite: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const handleGetFavoriteMovies = () => {
    const favoriteMovies = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
    setFavoriteMovies(favoriteMovies);
  };

  useEffect(() => {
    handleGetFavoriteMovies();
  }, []);

  const handleDeleteFavorite = (id: number) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== id);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    toast.success("Movie removed from watchlist!");
  };

  return (
    <div className="flex gap-6 flex-wrap items-center justify-center">
      <ToastContainer />
      {favoriteMovies.length !== 0
        ? favoriteMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex flex-col mt-6 text-gray-700 bg-gray-800 shadow-md bg-clip-border rounded-xl w-96"
            >
              <div className="relative h-80 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl rounded-b-none bg-blue-gray-500 shadow-blue-gray-500/40">
                <img src={`${imageURL}${movie.poster_path}`} alt="card-image" />
              </div>
              <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                  {movie.title}
                </h5>
                <p className="block font-sans text-base antialiased !line-clamp-[3] font-light leading-relaxed text-white">
                  {movie.overview}
                </p>
              </div>
              <div className="p-6 pt-0 flex justify-between">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-600 text-white shadow-md shadow-red-600/10 hover:shadow-lg hover:shadow-red-600/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  onClick={() => handleDeleteFavorite(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        : []}
    </div>
  );
};

export default Favorite;
