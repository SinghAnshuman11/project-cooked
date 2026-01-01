require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. Setup the Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function runTest() {
  try {
    // 2. This is "MOCK" data. 
    // Usually, this would come from Spotify. Today, we make it up.
    const mockUserHistory = {
      topArtist: "Cocomelon",
      topTrack: "Baby Shark",
      hoursListened: 5000,
      recentGenre: "Kids Pop"
    };

    // 3. The Prompt Engineering
    // We give the AI a "persona" and the data.
    const prompt = `
      You are a mean, sarcastic music critic. 
      Roast this user based on their listening history. 
      Be harsh but funny.
      
      User Data: ${JSON.stringify(mockUserHistory)}
    `;

    console.log("🔥 Roasting in progress...");

    // 4. Send to Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("\n--- THE ROAST ---\n");
    console.log(text);

  } catch (error) {
    console.error("Error:", error);
  }
}

runTest();