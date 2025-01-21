import axios from "axios";

export const fetchRandomTrack = async ({ accessToken }) => {
  const randomOffset = Math.floor(Math.random() * 1000) + 1;

  const search = getRandomSearch();

  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      type: "track",
      offset: randomOffset,
      q: search,
      limit: 1,
    },
  });

  const track = response.data.tracks.items[0];
  return track.id; // Return the first track
};

function getRandomSearch() {
  // Gets a random character from the characters string.
  const randomCharacter = getRandomCharacter();
  let randomSearch = "";

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.floor(Math.random() * 10)) {
    case 0:
    case 1:
    case 2:
    case 3:
      randomSearch = randomCharacter + "%";
      break;
    case 4:
    case 5:
    case 6:
      randomSearch = "%" + randomCharacter + "%";
      break;
    case 7:
    case 8:
    case 9:
      randomSearch = "%" + randomCharacter;
      break;
    default:
      break;
  }
  return randomSearch;
}

// function getRandomSearch() {
//   const getRandomCharacter = () => {
//     const characters = "abcdefghijklmnopqrstuvwxyz"; // Expand this with other alphabets if needed
//     return characters.charAt(Math.floor(Math.random() * characters.length));
//   };

//   let randomSearch = "";
//   const randomCharacter1 = getRandomCharacter();
//   const randomCharacter2 = getRandomCharacter();
//   const randomCharacter3 = getRandomCharacter();

//   // Randomly generate search strings with 1, 2, or 3 characters
//   const searchPattern = Math.floor(Math.random() * 10);

//   switch (searchPattern) {
//     case 0: // Single character with wildcard at the end
//     case 1:
//     case 2:
//     case 3:
//       randomSearch = randomCharacter1 + "%";
//       break;
//     case 4: // Two characters with wildcards
//     case 5:
//     case 6:
//       randomSearch = randomCharacter1 + "%" + randomCharacter2;
//       break;
//     case 7: // Three characters, wildcards in between
//       randomSearch = randomCharacter1 + "%" + randomCharacter2 + "%" + randomCharacter3;
//       break;
//     case 8: // Character at the start and end
//       randomSearch = randomCharacter1 + "%" + randomCharacter2 + randomCharacter3;
//       break;
//     case 9: // Wildcards on both sides
//       randomSearch = "%" + randomCharacter1 + randomCharacter2 + "%";
//       break;
//     default:
//       randomSearch = randomCharacter1 + "%";
//       break;
//   }

//   return randomSearch;
// }

function getRandomCharacter() {
  // Define Unicode ranges for each script
  const ranges = {
    latin: [
      [0x0041, 0x005a], // Latin Uppercase (A-Z)
      [0x0061, 0x007a], // Latin Lowercase (a-z)
    ],
    cyrillic: [[0x0400, 0x04ff]], // Cyrillic Basic
    chinese: [[0x4e00, 0x9fff]], // Chinese (CJK Unified Ideographs)
    japanese: [
      [0x3040, 0x309f], // Hiragana
      [0x30a0, 0x30ff], // Katakana
    ],
  };

  // Randomly decide which script to use
  const randomChoice = Math.random();
  let selectedRange;

  if (randomChoice < 0.7) {
    // 70% Latin
    selectedRange =
      ranges.latin[Math.floor(Math.random() * ranges.latin.length)];
  } else if (randomChoice < 0.85) {
    // 15% Cyrillic
    selectedRange = ranges.cyrillic[0];
  } else if (randomChoice < 0.925) {
    // 7.5% Chinese
    selectedRange = ranges.chinese[0];
  } else {
    // 7.5% Japanese
    selectedRange =
      ranges.japanese[Math.floor(Math.random() * ranges.japanese.length)];
  }

  // Generate a random character within the selected range
  const randomCodePoint =
    Math.floor(Math.random() * (selectedRange[1] - selectedRange[0] + 1)) +
    selectedRange[0];
  return String.fromCharCode(randomCodePoint);
}
