import { Movie } from "../App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  movies: Movie[];
}

export const imageURL = "https://image.tmdb.org/t/p/w500";

const Home: React.FC<Props> = ({ movies }) => {
  const handleAddFavorite = (movie: Movie) => {
    const favoriteMovies = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
    const updatedFavorites = [...favoriteMovies, movie];
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    toast.success("Movie added to watchlist!");
  };

  return (
    <div className="flex gap-6 flex-wrap items-center justify-center">
      <ToastContainer />
      {movies.length !== 0
        ? movies.map((movie) => (
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
              <div className="p-6 pt-0">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  onClick={() => handleAddFavorite(movie)}
                >
                  Add Watchlist
                </button>
              </div>
            </div>
          ))
        : []}
    </div>
  );
};

export default Home;
