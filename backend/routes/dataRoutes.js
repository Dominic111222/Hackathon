const express = require("express");
const router = express.Router();

// fake DB
let savedData = [];

// GET questions
router.get("/questions", (req, res) => {
  res.json([
    { id: "1", text: "What is your pet name?" },
    { id: "2", text: "What is your first school?" }
  ]);
});

// POST save answers with VALIDATION
router.post("/save", (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];

    // ❌ short answer check
    if (!a.answer || a.answer.length < 5) {
      return res.status(400).json({
        message: "Answer too short"
      });
    }

    // ❌ mismatch check
    if (a.answer !== a.confirmAnswer) {
      return res.status(400).json({
        message: "Answer mismatch"
      });
    }
  }

  savedData.push(answers);

  return res.status(200).json({
    message: "Saved successfully"
  });
});

module.exports = router;