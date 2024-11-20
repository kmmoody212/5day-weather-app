import dotenv from "dotenv";
import { WeatherService } from "./weatherService";

// import weatherService from "./weatherService";
dotenv.config();

console.log("Start");
console.log(process.env.API_KEY);
console.log(process.env.API_BASE_URL);
console.log("end");

const service = new WeatherService(
  "https://api.openweathermap.org",
  "aa4091a0b7e4c9d37f87f34259e6c5e5"
);

(async function () {
  console.log(await service.getWeatherForCity("Raleigh"));
})();
