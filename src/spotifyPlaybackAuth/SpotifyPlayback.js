import { CLIENT_ID, REDIRECT_URI } from "../config/Config";
import { clearTokens } from "../api/TokenHandler";

const SCOPES = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
];

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}&scope=${encodeURIComponent(SCOPES.join(" "))}`;

export const loginToSpotify = () => {
  window.location.href = AUTH_URL;
};

export const logoutFromSpotify = () => {
  clearTokens();
  window.location.href = "/";
};
