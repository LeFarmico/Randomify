import axios from "axios";

export const fetchRandomTrackFromPlaylist = async ({
  accessToken,
  playlistUrl,
}) => {
  const playlistRegex =
    /^https:\/\/open\.spotify\.com\/playlist\/([\w\d]+)(\?.*)?$/;
  const playlistId = playlistUrl.match(playlistRegex)[1];

  try {
    const tracksTotalResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { fields: "total" },
      },
    );

    const randomIndex = Math.floor(
      Math.random() * tracksTotalResponse.data.total,
    );

    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { offset: randomIndex, limit: 1 },
      },
    );
    return response.data.items[0].track.id;
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
};
