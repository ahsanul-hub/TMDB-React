const token = import.meta.env.VITE_TMDB_API_TOKEN;

export const getToken = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new`,
      options
    );
    const data = await response.json();
    return data.request_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

export const loginWithToken = async (
  username: string,
  password: string,
  token: string
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username,
      password,
      request_token: token,
    }),
  };
  try {
    console.log(username, password, token);
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login`,
      options
    );

    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      throw new Error(data.status_message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};
