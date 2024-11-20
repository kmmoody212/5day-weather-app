const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes

// HTML Route: Serve `index.html`
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Route: Get search history
app.get("/api/weather/history", (req, res) => {
  fs.readFile("searchHistory.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read search history" });
    }
    res.json(JSON.parse(data));
  });
});

// API Route: Save city and return weather data
app.post("/api/weather", (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  // Generate unique ID for the city
  const newEntry = { id: uuidv4(), city };

  // Read the existing search history
  fs.readFile("searchHistory.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read search history" });
    }

    const history = JSON.parse(data);
    history.push(newEntry);

    // Save updated history back to file
    fs.writeFile(
      "searchHistory.json",
      JSON.stringify(history, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Unable to save search history" });
        }

        // Simulate weather data (replace with real API call)
        const weatherData = { city, weather: "Sunny", temperature: 25 };

        res.json(weatherData);
      }
    );
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
