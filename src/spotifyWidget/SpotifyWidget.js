import "./SpotifyWidget.css";

const SpotifyWidget = ({ trackId, isLoading }) => {
  if (isLoading && trackId) {
    // Simulate loading state (you can adjust this logic as per your needs)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Randomizing</p>
      </div>
    );
  }

  if (!trackId) {
    return (
      <div className="empty-state">
        <p>Select a track to play</p>
      </div>
    );
  }

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${trackId}`}
      width="300"
      height="352"
      frameborder="0"
      allowTransparency="true"
      allow="encrypted-media"
      title="Spotify Widget"
    ></iframe>
  );
};

export default SpotifyWidget;
