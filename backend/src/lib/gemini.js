import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateGeminiPrompt(prompt) {
  try {
    const config = {
      responseMimeType: "text/plain",
      systemInstruction: [
        {
          text: `You must answer question related to learning communication languages. Do not answer questions related to any other topics.`,
        },
      ],
    };

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const stream = await ai.models.generateContentStream({
      model: "gemini-1.5-flash",
      config,
      contents,
    });

    let fullResponse = "";

    for await (const chunk of stream) {
      const part = chunk.text;
      if (part) fullResponse += part;
    }

    return fullResponse;
  } catch (error) {
    console.error("Error generating prompt:", error.message);
    throw new Error(error.message);
  }
}

export default generateGeminiPrompt;
