import { createContext, useContext, useState, ReactNode } from "react";
import { Movie } from "../App";

type FavoriteContextType = {
  favoriteMovies: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>(() => {
    const storedFavorites = localStorage.getItem("favoriteMovies");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (movie: Movie) => {
    const isFavorited = favoriteMovies.some((fav) => fav.id === movie.id);
    const updatedFavorites = isFavorited
      ? favoriteMovies.filter((fav) => fav.id !== movie.id)
      : [...favoriteMovies, movie];

    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id: number) => {
    return favoriteMovies.some((movie) => movie.id === id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteMovies, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
