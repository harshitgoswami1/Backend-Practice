export function calculateExpression(blendshapes) {
  const getScore = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;

  const smileLeft = getScore("mouthSmileLeft");
  const smileRight = getScore("mouthSmileRight");
  const frownLeft = getScore("mouthFrownLeft");
  const frownRight = getScore("mouthFrownRight");
  const browUp = getScore("browInnerUp");
  const browDownLeft = getScore("browDownLeft");
  const browDownRight = getScore("browDownRight");
  const jawOpen = getScore("jawOpen");

  const smileScore = (smileLeft + smileRight) / 2;
  const frownScore = (frownLeft + frownRight) / 2;
  const browDownScore = (browDownLeft + browDownRight) / 2;

  // 🔥 Improved Weighted Scoring
  const happyScore = smileScore * 1.5;

  const sadScore =
    frownScore * 1.4 +
    browDownScore * 1.2 +
    browUp * 0.3 -
    smileScore * 1.5; // strong penalty if smiling

  const surprisedScore = jawOpen * 1.3 + browUp * 1.2;

  const scores = {
    happy: happyScore,
    sad: sadScore,
    surprised: surprisedScore,
  };

  const topExpression = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  // Higher threshold for better reliability
  if (scores[topExpression] < 0.4) {
    return "Neutral 😐";
  }

  if (topExpression === "happy") return "Happy 😄";
  if (topExpression === "sad") return "Sad 😢";
  if (topExpression === "surprised") return "Surprised 😲";

  return "Neutral 😐";
}