import "./App.css";
import React, { useState, useEffect } from "react";
import SpotifyWidget from "./spotifyWidget/SpotifyWidget";
import {
  loginToSpotify,
  logoutFromSpotify,
} from "./spotifyPlaybackAuth/SpotifyPlayback";
import { fetchRandomTrack } from "./api/FetchRandomTrack";
import { saveTokens, getTokens } from "./api/TokenHandler";
import SpotifyButton from "./component/SpotifyLoginButton";
import RandomifyButton from "./component/RandomifyButton";
import { fetchRandomTrackFromPlaylist } from "./api/FetchRandomTrackFromPlaylist";
import PlaylistUrlInput from "./component/PlaylistUrlInput";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [trackId, setTrackId] = useState("");

  const handleGetRandomSong = async () => {
    const maxRetries = 10;
    const retryDelay = 300;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    setIsLoading(true);
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt} to fetch a random song...`);
        const generatedTrackId = await fetchRandomTrack({ accessToken });
        setTrackId(generatedTrackId);
        setIsLoading(false);
        return;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        setIsLoading(false);
        if (attempt < maxRetries) {
          await delay(retryDelay);
        } else {
          alert("Failed to fetch a random song. Please try one more time.");
        }
      }
    }
  };

  const handleGetRandomPlaylistSong = async (playlistUrl) => {
    const maxRetries = 10;
    const retryDelay = 300;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    setIsLoading(true);
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Playlist url ${playlistUrl} to fetch a random song...`);
        const generatedTrackId = await fetchRandomTrackFromPlaylist({
          accessToken,
          playlistUrl,
        });
        console.log(`Playlist url ${playlistUrl} to fetch a random song...`);
        setTrackId(generatedTrackId);
        setIsLoading(false);
        return;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        setIsLoading(false);
        if (attempt < maxRetries) {
          await delay(retryDelay);
        } else {
          alert("Failed to fetch a random song. Please try one more time.");
        }
      }
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));

    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in");

    if (accessToken && expiresIn) {
      const expiresAt = Date.now() + parseInt(expiresIn, 10) * 1000;
      saveTokens({ accessToken, expiresAt });

      setAccessToken(accessToken);
      setIsLoggedIn(true);

      window.location.hash = "";
    } else {
      const tokens = getTokens();

      if (tokens?.accessToken && Date.now() < tokens.expiresAt) {
        setAccessToken(tokens.accessToken);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <SpotifyWidget trackId={trackId} isLoading={isLoading} />
        <SpotifyButton
          isLoggedIn={isLoggedIn}
          onClick={isLoggedIn ? logoutFromSpotify : loginToSpotify}
        />
        {isLoggedIn ? (
          <>
            <RandomifyButton onClick={() => handleGetRandomSong()} />
            <PlaylistUrlInput onClick={handleGetRandomPlaylistSong} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
