import React from "react";

const RandomifyButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        backgroundColor: "#F4D35E",
        color: "#fff",
        border: "none",
        borderRadius: "50px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
      }}
      onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
    >
      Randomify
    </button>
  );
};

export default RandomifyButton;
