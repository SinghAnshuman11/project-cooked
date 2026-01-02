require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(express.static('public'));
const port = 3000;

// --- CONFIGURATION ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- ROUTES ---

// 1. Home Route
app.get('/', (req, res) => {
  res.send('<h1>Project Cooked Server is Online! 🍳</h1><a href="/roast">Click here to get roasted (Mock Data)</a>');
});

// 2. The Login Route
app.get('/login', (req, res) => {
  res.send("TODO: Redirect to Spotify Login");
});

// 3. The Callback Route (Where Spotify sends the user back)
app.get('/callback', (req, res) => {
  res.send("TODO: Handle Spotify Callback");
});

// 4. The Roast Route
app.post('/roast', async (req, res) => {
  try {
    // 1. Get the user's input from the request body
    // If they didn't type anything, we default to "Unknown"
    const artists = req.body.artists || "Unknown Artist";

    console.log("🔥 Received roast request for:", artists);

    // 2. Dynamic Prompt
    const prompt = `
      You are a mean, sarcastic music critic. 
      The user listens to: ${artists}.
      Roast their music taste mercilessly. Be short but brutal.
    `;

    // 3. Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.send(text);

  } catch (error) {
    console.error(error);
    res.status(500).send("The AI broke. Try again.");
  }
});

// --- START SERVER ---
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});