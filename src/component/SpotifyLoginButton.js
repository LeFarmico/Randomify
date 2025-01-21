import React from "react";

const SpotifyButton = ({ isLoggedIn, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        backgroundColor: isLoggedIn ? "#191414" : "#1DB954", // Black for logout, green for login
        color: "#fff",
        border: "none",
        borderRadius: "50px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
      }}
      onMouseEnter={
        (e) =>
          (e.target.style.backgroundColor = isLoggedIn ? "#333" : "#1ED760") // Lighter shades on hover
      }
      onMouseLeave={
        (e) =>
          (e.target.style.backgroundColor = isLoggedIn ? "#191414" : "#1DB954") // Original colors on mouse leave
      }
      onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
    >
      {isLoggedIn ? "Logout from Spotify" : "Login to Spotify"}
    </button>
  );
};

export default SpotifyButton;
