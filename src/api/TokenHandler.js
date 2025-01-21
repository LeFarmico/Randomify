const TOKEN_KEY = "spotifyAccessToken";
const EXPIRES_AT = "spotifyExpiresAt";

export const saveTokens = ({ accessToken, expiresAt }) => {
  if (accessToken && expiresAt) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(EXPIRES_AT, expiresAt.toString());
  } else {
    console.error("Invalid tokens provided to saveTokens.");
  }
};

export const getTokens = () => {
  const accessToken = localStorage.getItem(TOKEN_KEY);
  const expiresAt = localStorage.getItem(EXPIRES_AT);

  if (accessToken && expiresAt) {
    return {
      accessToken,
      expiresAt: parseInt(expiresAt, 10), // Convert expiresAt to a number
    };
  }

  return null; // No valid tokens found
};

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT);
};
