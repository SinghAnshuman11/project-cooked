require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.static('public'));
const port = 3000;

// --- CONFIGURATION ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Or 2.0/1.5 depending on what worked for you

// --- ROUTES ---

// 1. Home Route (Just to check if server is alive)
app.get('/', (req, res) => {
  res.send('<h1>Project Cooked Server is Online! 🍳</h1><a href="/roast">Click here to get roasted (Mock Data)</a>');
});

// 2. The Login Route (We will build this when Spotify works)
app.get('/login', (req, res) => {
  res.send("TODO: Redirect to Spotify Login");
});

// 3. The Callback Route (Where Spotify sends the user back)
app.get('/callback', (req, res) => {
  res.send("TODO: Handle Spotify Callback");
});

// 4. The Roast Route (INTEGRATED)
app.get('/roast', async (req, res) => {
  try {
    // TODO: Later, this data will come from the real user's Spotify session
    const mockUserHistory = {
      topArtist: "Cocomelon",
      topTrack: "Baby Shark",
      hoursListened: 5000,
      recentGenre: "Kids Pop"
    };

    const prompt = `
      You are a mean, sarcastic music critic. 
      Roast this user based on their listening history. 
      User Data: ${JSON.stringify(mockUserHistory)}
    `;

    console.log("🔥 Generating Roast...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the text back to the browser
    // We use a simple <pre> tag to keep the formatting neat
    res.send(
      res.send(text)
    );

  } catch (error) {
    console.error(error);
    res.status(500).send("The AI broke. Probably because your taste is too bad.");
  }
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});