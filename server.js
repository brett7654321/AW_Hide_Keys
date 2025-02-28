require('dotenv').config({ path: 'ini.env' });
console.log('Loaded API Key:', process.env.API_KEY);
const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 3000;

//add as many sites or pages you need
const allowedOrigins = ["https://autonomouswebsites.net", "https://yoursite.net"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Blocked by CORS. Contact MyWebsite.net for Access to our APIs.")); // Block request
    }
  },
  credentials: true // If using cookies or authorization headers
}));

app.use((req, res, next) => {
  if (!req.headers.origin || !allowedOrigins.includes(req.headers.origin)) {
    return res.status(403).json({ error: "Blocked by our Cross-Origin Resource Sharing Protection. Contact MyWebsite.net for Access to our APIs." });
  }
  next();
});

// If a request **doesn’t have an `Origin` header** (e.g., direct URL access in a browser), it will be **blocked**.
//If a request comes from an **unapproved domain**, it will also be **blocked**.
// Endpoint to return API key
app.get('/api-key', (req, res) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not found' });
    }
    res.json({ apiKey });
});

console.log('API access is spun up for MyWebsite.');

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
	
});