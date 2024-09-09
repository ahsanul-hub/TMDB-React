import Movies from "./Movies";

import { useWatchlist } from "../context/WatchlistContext";
import "react-toastify/dist/ReactToastify.css";
// import Watchlist from "../assets/Watchlist";

const Watchlist: React.FC = () => {
  const { watchlistMovies } = useWatchlist();

  return (
    <div className="flex gap-6 flex-wrap items-center justify-center">
      {watchlistMovies.length !== 0 ? (
        <Movies movies={watchlistMovies} title="YOUR WATCHLIST MOVIES" />
      ) : (
        <p className="text-white mt-6">No watchlist movies found.</p>
      )}
    </div>
  );
};

export default Watchlist;
