require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// We export this function so other files can use it
async function generateRoast(artistName) {
  const prompt = `
      You are a mean, sarcastic music critic. 
      The user listens to: ${artistName}.
      Roast their music taste mercilessly. Be short but brutal.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm too disgusted by your taste to even speak. (AI Error)";
  }
}

module.exports = { generateRoast };