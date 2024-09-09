import { useEffect } from "react";
import Movies from "./Movies";
import { useFavorite } from "../context/FavoriteContext";
import "react-toastify/dist/ReactToastify.css";

const Favorite: React.FC = () => {
  const { favoriteMovies } = useFavorite();

  useEffect(() => {}, []);

  return (
    <div className="flex gap-6 flex-wrap items-center justify-center">
      {favoriteMovies.length !== 0 ? (
        <Movies movies={favoriteMovies} title="YOUR FAVORITE MOVIES" />
      ) : (
        <p className="text-white mt-6">No favorite movies found.</p>
      )}
    </div>
  );
};

export default Favorite;
