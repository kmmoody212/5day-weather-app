import dayjs, { type Dayjs } from "dayjs";
import dotenv from "dotenv";
dotenv.config();

class Weather {
  city: string;
  date: Dayjs | string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

class WeatherService {
  private baseURL?: string;

  private apiKey?: string;

  private city = "";

  constructor() {
    this.baseURL = process.env.API_BASE_URL || "";

    this.apiKey = process.env.API_KEY || "";
  }

  private buildWeatherQuery(city: string): string {
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?q=${city}&units=imperial&appid=${this.apiKey}`;
    return weatherQuery;
  }


  private async fetchWeatherData(city: string) {
    try {
      const response = await fetch(this.buildWeatherQuery(city)).then(
        (res) => res.json()
      );
      if (!response) {
        throw new Error("Weather data not found");
      }

      const currentWeather: Weather = this.parseCurrentWeather(
        response.list[0]
      );

      const forecast: Weather[] = this.buildForecastArray(
        currentWeather,
        response.list
      );
      return forecast;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }

  private parseCurrentWeather(response: any) {
    const parsedDate = dayjs.unix(response.dt).format("M/D/YYYY");

    const currentWeather = new Weather(
      this.city,
      parsedDate,
      response.main.temp,
      response.wind.speed,
      response.main.humidity,
      response.weather[0].icon,
      response.weather[0].description || response.weather[0].main
    );

    return currentWeather;
  }

  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weatherForecast: Weather[] = [currentWeather];

    const filteredWeatherData = weatherData.filter((data: any) => {
      return data.dt_txt.includes("12:00:00");
    });

    for (const day of filteredWeatherData) {
      weatherForecast.push(
        new Weather(
          this.city,
          dayjs.unix(day.dt).format("M/D/YYYY"),
          day.main.temp,
          day.wind.speed,
          day.main.humidity,
          day.weather[0].icon,
          day.weather[0].description || day.weather[0].main
        )
      );
    }

    return weatherForecast;
  }

  async getWeatherForCity(city: string) {
    try {
      this.city = city;
    
      if (city) {
        const weather = await this.fetchWeatherData(city);
        return weather;
      }

      throw new Error("Weather data not found");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new WeatherService();
