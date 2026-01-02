require('dotenv').config();
const express = require('express');
const { generateRoast } = require('./services/ai'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/roast', async (req, res) => {
  const artists = req.body.artists || "Unknown";
  
  const roastText = await generateRoast(artists);
  
  res.send(roastText);
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});