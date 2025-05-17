import generateGeminiPrompt from "../lib/gemini.js";

export async function generatePrompt(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }
    const result = await generateGeminiPrompt(prompt);
    if (!result) {
      return res.status(500).json({ message: "Error generating prompt" });
    }
    res.status(200).json({ result });
  } catch (error) {
    // console.error("Error in generatePrompt controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
