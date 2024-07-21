const token = import.meta.env.VITE_TMDB_API_TOKEN;

export const getMovieList = async () => {
  console.log("token", token);
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
