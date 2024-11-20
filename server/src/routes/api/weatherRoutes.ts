import { Router } from "express";
import dotenv from "dotenv";
import { WeatherService } from "../../service/weatherService.js";
dotenv.config();
const router = Router();

// TODO: POST Request with city name to retrieve weather data
const API_KEY: string = process.env.API_KEY as string;
const API_BASE_URL: string = process.env.API_BASE_URL as string;
router.post("/data/:city", async (req, res) => {
  const service = new WeatherService(API_BASE_URL, API_KEY);
  const weather = await service.getWeatherArrayForCity(req.params.city);
  console.log(weather);
  res.json(weather);
});

// TODO: GET search history
router.get("/history", async (_req, _res) => {});

// * BONUS TODO: DELETE city from search history
router.delete("/history/:id", async (_req, _res) => {});

export default router;
