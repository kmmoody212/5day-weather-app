import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
console.log("Start");
console.log(process.env.API_KEY);
console.log(process.env.API_BASE_URL);
console.log("end");
// TODO: POST Request with city name to retrieve weather data
router.post("/", (_req, res) => {
  res.status(404).send("This hasn't been implemented yet.");
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get("/history", async (_req, _res) => {});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (_req, _res) => {});

export default router;
