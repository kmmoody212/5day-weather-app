// import dotenv from "dotenv";
// dotenv.config();
// import dayjs, { type Dayjs } from "dayjs";

// // Defined an interface for the Coordinates object
// interface Coordinates {
//   name: string;
//   lat: number;
//   lon: number;
//   state: string;
//   country: string;
// }
// // Defined a class for the Weather object
// class Weather {
//   city: string;
//   date: Dayjs | string;
//   icon: string;
//   iconDescription: string;
//   tempF: number;
//   windSpeed: number;
//   humidity: number;

//   constructor(
//     city: string,
//     date: Dayjs | string,
//     icon: string,
//     iconDescription: string,
//     tempF: number,
//     windSpeed: number,
//     humidity: number
//   ) {
//     this.city = city;
//     this.date = date;
//     this.icon = icon;
//     this.iconDescription = iconDescription;
//     this.tempF = tempF;
//     this.windSpeed = windSpeed;
//     this.humidity = humidity;
//   }
// }

// //Completed the WeatherService class
// class WeatherService {
//   // Defines the baseURL, API key, and city name properties
//   private baseURL: string;
//   private apiKey: string;
//   private city = "";

//   constructor() {
//     this.baseURL = process.env.API_BASE_URL || "";
//     this.apiKey = process.env.API_KEY || "";
//   }

//   // TODO: Create buildWeatherQuery method
//   private buildWeatherQuery(coordinates: Coordinates): string {
//     const { lat, lon } = coordinates;
//     if (!lat || !lon) {
//       throw new Error(
//         "Latitude and longitude are required to build the weather query."
//       );
//     }
//     return `${this.baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`;
//   }

//   // TODO: Create fetchWeatherData method
//   private async fetchWeatherData(coordinates: Coordinates) {
//     try {
//       // Build the weather query URL using coordinates
//       const query = this.buildWeatherQuery(coordinates);
//       // Fetch the weather data from the API
//       const response = await fetch(query);
//       if (!response.ok) {
//         throw new Error(`Error fetching weather data: ${response.statusText}`);
//       }
//       // Parse the response JSON
//       const data = await response.json();
//       // Extract relevant fields for the Weather object
//       const weather = new Weather(
//         coordinates.name,
//         dayjs.unix(data.dt), // Converts timestamp to a Dayjs date
//         data.weather[0].icon,
//         data.weather[0].description,
//         data.main.temp,
//         data.wind.speed,
//         data.main.humidity
//       );

//       return weather;
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//       throw error;
//     }
//   }
//   // TODO: Build parseCurrentWeather method
//   private parseCurrentWeather(response: any) {
//     // Validate that required fields are present in the response
//     if (
//       !response ||
//       !response.main ||
//       !response.weather ||
//       response.weather.length === 0
//     ) {
//       throw new Error("Invalid response format for current weather data");
//     }

//     // Extract relevant fields and create a Weather object
//     return new Weather(
//       response.name, // City name
//       dayjs.unix(response.dt), // Date as a Dayjs object from Unix timestamp
//       response.weather[0].icon, // Weather icon code
//       response.weather[0].description, // Weather description
//       response.main.temp, // Temperature in Fahrenheit
//       response.wind.speed, // Wind speed
//       response.main.humidity // Humidity percentage
//     );
//   }
// TODO: Complete buildForecastArray method
// private buildForecastArray(
//   currentWeather: Weather,
//   weatherData: any[]
// ): Weather[] {
// Initialize the forecast array with the current weather as the first element
//   const forecastArray: Weather[] = [currentWeather];

//   // Iterate over the weatherData array and transform each entry into a Weather object
//   for (const data of weatherData) {
//     if (
//       !data.dt ||
//       !data.main ||
//       !data.weather ||
//       data.weather.length === 0
//     ) {
//       console.warn("Skipping incomplete forecast data entry:", data);
//       continue; // Skip any incomplete data entries
//     }

//     // Create a new Weather object for each forecast entry
//     const forecast = new Weather(
//       currentWeather.city, // Use the same city as current weather
//       dayjs.unix(data.dt), // Convert timestamp to Dayjs date
//       data.weather[0].icon, // Weather icon code
//       data.weather[0].description, // Weather description
//       data.main.temp, // Temperature in Fahrenheit
//       data.wind.speed, // Wind speed
//       data.main.humidity // Humidity percentage
//     );

//     forecastArray.push(forecast); // Add the forecast entry to the array
//   }

//   return forecastArray;
// }
// // // TODO: Complete getWeatherForCity method
// // async getWeatherForCity(city: string): Promise<Weather[]> {
//   try {
//     // Set the city for the WeatherService instance
//     this.city = city;

//     // Step 1: Fetch and destructure location data to get coordinates
//     const coordinates = await this.fetchAndDestructureLocationData();

//     // Step 2: Use fetchWeatherData method to fetch current weather
//     const currentWeather = await this.fetchWeatherData(coordinates);

//     // Step 3: Fetch the weather forecast data (assuming an endpoint for 5-day forecast)
//     const forecastResponse = await fetch(
//       `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`
//     );
//     if (!forecastResponse.ok) {
//       throw new Error(
//         `Error fetching forecast data: ${forecastResponse.statusText}`
//       );
//     }
//     const forecastData = await forecastResponse.json();

//     // Step 4: Build the forecast array including the current weather
//     const forecastArray = this.buildForecastArray(
//       currentWeather,
//       forecastData.list
//     );

//     return forecastArray;
//   } catch (error) {
//     console.error("Error in getWeatherForCity:", error);
//     throw error;
//   }
// }
// }

// export default new WeatherService();
