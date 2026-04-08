const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/data.json");

exports.getQuestions = (req, res) => {
  try {
    const fileData = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
    res.json(fileData.questions);
  } catch (err) {
    res.status(500).json({ message: "Error reading questions file" });
  }
};

exports.saveAnswers = (req, res) => {
  try {
    const fileData = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

    // ensure array exists
    if (!Array.isArray(fileData.savedAnswers)) {
      fileData.savedAnswers = [];
    }

    // ADD instead of overwrite
    fileData.savedAnswers.push({
      id: Date.now(),
      answers: req.body
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(fileData, null, 2));

    res.json({ message: "Security questions saved successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving answers" });
  }
};