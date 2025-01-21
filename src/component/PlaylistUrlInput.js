import React, { Component } from "react";

class PlaylistUrlInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistUrl: "",
      isValidUrl: false,
    };
  }

  validatePlaylistUrl(url) {
    const playlistRegex =
      /^https:\/\/open\.spotify\.com\/playlist\/([\w\d]+)(\?.*)?$/;
    return playlistRegex.test(url);
  }

  handleUrlChange = (e) => {
    const url = e.target.value;
    this.setState({
      playlistUrl: url,
      isValidUrl: this.validatePlaylistUrl(url),
    });
  };

  render() {
    const { playlistUrl, isValidUrl } = this.state;
    const { onClick } = this.props;

    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3 style={{ color: "#fff" }}>From Spotify Playlist</h3>
        <input
          type="text"
          value={playlistUrl}
          onChange={this.handleUrlChange}
          placeholder="Enter Spotify playlist URL"
          style={{
            padding: "10px",
            width: "500px",
            border:
              playlistUrl === ""
                ? "2px solid yellow"
                : isValidUrl
                  ? "2px solid green"
                  : "2px solid red",
            backgroundColor: "transparent",
            color: "white",
            caretColor: "white",
            borderRadius: "50px",
          }}
        />
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => onClick(playlistUrl)}
            disabled={!isValidUrl}
            style={{
              padding: "12px 24px",
              backgroundColor: isValidUrl ? "#F4D35E" : "gray",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              cursor: isValidUrl ? "pointer" : "not-allowed",
            }}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            {isValidUrl ? "Randomify playlist" : "Invalid URL"}
          </button>
        </div>
      </div>
    );
  }
}

export default PlaylistUrlInput;
