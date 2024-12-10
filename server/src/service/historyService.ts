import fs from "node:fs/promises"; // file system from node to read files
import { v4 as uuidv4 } from "uuid"; // uuid for unique id
// City class with name and id properties
class City {
  name: string;
  id: string;
  weather:
    | [
        {
          // weather object to retrieve from history without recalling api
          name: string;
          temperature: string;
          date: string;
          icon: string;
          iconDescription: string;
          tempF: string;
          windSpeed: string;
          humidity: string;
        }
      ]
    | null;
  constructor(name: string, id: string, weather = null) {
    this.name = name;
    this.id = id;
    this.weather = weather;
  }
}
// HistoryService class
class HistoryService {
  // Read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile("db/searchHistory.json", {
      flag: "r",
      encoding: "utf8",
    });
  }
  // Write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile(
      "db/searchHistory.json",
      JSON.stringify(cities, null, "\t")
    );
  }
  // getCities method that reads the cities from the searchHistory.json file uand returns them as an array of City objects
  async getCities() {
    return await this.read().then((citiesJson) => {
      let parsedCities: City[];

      try {
        parsedCities = [].concat(JSON.parse(citiesJson));
      } catch (err) {
        parsedCities = [];
      }

      return parsedCities;
    });
  }
  // addCity method that adds a city to the searchHistory.json file
  async addCity(city: string, weather: any) {
    if (!city) {
      throw new Error("City can not be blank");
    }
    const citiesArray = await this.getCities(); // get cities array
    let cityExists = false;
    let existingCity = new City("", "", null);

    for (let i = 0; i < citiesArray.length; i++) {
      if (city.toLowerCase() === citiesArray[i].name.toLowerCase()) {
        cityExists = true;
        existingCity = citiesArray[i];
        break;
      }
    }

    if (!cityExists) {
      const newCity: City = {
        name: city,
        id: uuidv4(),
        weather,
      };
      console.log(
        "this is a new city object with weather" + JSON.stringify(newCity)
      );

      return await this.getCities()
        .then((parsedCities) => {
          return [...parsedCities, newCity];
        })
        .then((updatedCities) => this.write(updatedCities))
        .then(() => newCity);
    } else {
      console.log("City already exists: " + city);
      return existingCity;
    }
  }

  // removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
      .then((cities: City[]): City[] => {
        return cities.filter((city) => city.id !== id);
      })
      .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
