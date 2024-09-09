import { createContext, useContext, useState, ReactNode } from "react";
import { Movie } from "../App";

type WatchlistContextType = {
  watchlistMovies: Movie[];
  toggleWatchlist: (movie: Movie) => void;
  isInWatchlist: (id: number) => boolean;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>(() => {
    const storedWatchlist = localStorage.getItem("watchlistMovies");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  const toggleWatchlist = (movie: Movie) => {
    const isInWatchlist = watchlistMovies.some((item) => item.id === movie.id);
    const updatedWatchlist = isInWatchlist
      ? watchlistMovies.filter((item) => item.id !== movie.id)
      : [...watchlistMovies, movie];

    setWatchlistMovies(updatedWatchlist);
    localStorage.setItem("watchlistMovies", JSON.stringify(updatedWatchlist));
  };

  const isInWatchlist = (id: number) => {
    return watchlistMovies.some((movie) => movie.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlistMovies, toggleWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
