// --- DATA ---

const skins = [
  {
    name: "AK-47 | Redline",
    colors: ["red", "black"]
  }
];

const stickers = [
  { colors: ["red"], rarity: 2 },
  { colors: ["black"], rarity: 1 },
  { colors: ["gold"], rarity: 3 },
  { colors: ["green"], rarity: 1 },
  { colors: ["red", "black"], rarity: 3 }
];

// --- SCORING ---

function scoreSticker(skin, sticker) {
  let score = 0;

  sticker.colors.forEach(c => {
    if (skin.colors.includes(c)) score += 3;
    else score += 1;
  });

  score += sticker.rarity;
  return score;
}

// --- GENERATE BEST CRAFT ---

function generate() {
  const skin = skins[document.getElementById("skinSelect").value];

  // score all stickers
  let scored = stickers.map(s => ({
    sticker: s,
    score: scoreSticker(skin, s)
  }));

  // sort best first
  scored.sort((a, b) => b.score - a.score);

  // take top 4 (best combo)
  let best = scored.slice(0, 4);

  // assign positions (1–4)
  let positions = [
    { slot: 1, data: best[0] },
    { slot: 2, data: best[1] },
    { slot: 3, data: best[2] },
    { slot: 4, data: best[3] }
  ];

  // output ONLY placement + quality
  let output = "<h3>Best Craft Layout</h3>";

  positions.forEach(p => {
    let quality =
      p.data.score >= 8 ? "Perfect Match" :
      p.data.score >= 6 ? "Good Match" :
      "Contrast";

    output += `Slot ${p.slot}: ${quality}<br>`;
  });

  document.getElementById("results").innerHTML = output;
}
