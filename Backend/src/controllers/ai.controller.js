const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || !code.trim() || typeof code !== "string") {
      return res.status(400).send("Prompt is required!");
    }

    const response = await aiService(code);

    res.send(response);
  } catch (error) {
    console.error("Error in getReview controller:", error);
    res.status(500).send("Internal Server Error");
  }
};
