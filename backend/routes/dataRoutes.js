const express = require("express");
const router = express.Router();

let savedData = [];

router.get("/questions", (req, res) => {
  res.json([
    { id: "1", text: "What is your mother's maiden name?" },
    { id: "2", text: "What was the name of your first pet?" },
    { id: "3", text: "What was the name of your first school?" },
    { id: "4", text: "In what city were you born?" },
    { id: "5", text: "What is your favorite book?" }
  ]);
});

router.post("/save", (req, res) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];

    if (!a.answer || a.answer.length < 5) {
      return res.status(400).json({
        message: "Answer too short"
      });
    }

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