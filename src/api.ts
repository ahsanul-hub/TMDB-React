import { Movie } from "./App";

const token = import.meta.env.VITE_TMDB_API_TOKEN;

export const getMovieList = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();


    return data.results;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMovieTopRated = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=Indonesia",
      options
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMoviePlaying = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      options
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getSearchMovie = async (search: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("data", data);
    return data.results;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMovieDetail = async (id: number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    const movieDetails: Movie = {
      id: data.id,
      title: data.title,
      overview: data.overview,
      release_date: data.release_date,
      poster_path: data.poster_path,
      tagline: data.tagline,
      genres: data.genres.map((genre: any) => genre.name).join(", "),
      runtime: data.runtime,
      backdrop_path: data.backdrop_path,
    };

    return movieDetails;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getRecommendations = async (id: number) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results;
  } catch (err) {
    console.error(err);
    return null;
  }
};
