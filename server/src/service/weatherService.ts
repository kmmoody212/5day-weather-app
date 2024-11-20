import { type Dayjs } from "dayjs";

// Defined a class for the Weather object
export class Weather {
  city: string;
  date: Dayjs | string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
    city: string,
    date: Dayjs | string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// WeatherService class
export class WeatherService {
  // Defines the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    // this.baseURL = process.env.API_BASE_URL || "";
    // this.apiKey = process.env.API_KEY || "";
  }
  // TODO: Create buildWeatherQuery method
  buildWeatherQuery(city: string): string {
    return `${this.baseURL}/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=imperial`;
  }
  // TODO: Create fetchWeatherData method
  async fetchWeatherData(city: string): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(city));
    return await response.json();
  }

  // TODO: Build parseCurrentWeather method
  parseCurrentWeather(data: any) {
    const weather = data.list[0];
    // console.log(weather);
    const myWeather = new Weather(
      data.city.name,
      weather.dt_txt,
      "",
      "",
      weather.main.temp,
      weather.wind.speed,
      weather.main.humidity
    );
    // console.log(myWeather);
    return myWeather;
  }

  // TODO: Complete buildForecastArray method
  buildForecastArray(data: any): Weather[] {
    return data.list.slice(0, 5).map((weather: any) => {
      const myWeather = new Weather(
        data.city.name,
        weather.dt_txt,
        "",
        "",
        weather.main.temp,
        weather.wind.speed,
        weather.main.humidity
      );
      // console.log(myWeather);
      return myWeather;
    });
  }

  async getWeatherForCity(city: string): Promise<Weather> {
    const data = await this.fetchWeatherData(city);
    return this.parseCurrentWeather(data);
  }

  async getWeatherArrayForCity(city: string): Promise<Weather[]> {
    const data = await this.fetchWeatherData(city);
    return this.buildForecastArray(data);
  }
}
