import { getGeocode, getWeatherData } from './packages/weather_data.js';
import readline from 'readline';
import chalk from 'chalk';

function displayWeather(weatherData) {
    if (!weatherData) {
        console.log('❌ Could not retrieve weather data');
        return null;
    }

    console.log('\n  Weather Information');
    console.log('=======================');
    console.log(`Location: ${weatherData.name}, ${weatherData.sys.country}`);
    console.log(`Temperature: ${Math.round(weatherData.main.temp - 273.15)}°C (Feels like ${Math.round(weatherData.main.feels_like - 273.15)}°C)`);
    console.log(`Condition: ${weatherData.weather[0].description}`);
    console.log(`Humidity: ${weatherData.main.humidity}%`);
    console.log(`Wind: ${weatherData.wind.speed} m/s`);
    console.log(`Visibility: ${weatherData.visibility / 1000} km`);
    console.log('=======================\n');
}

async function handleCommandLine() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log("Usage of weather CLI: node index.js <city-name>");
        return null;
    }
    const city = args.join(' ');
    console.log(`Seaching for weather in ${city}...`);

    const coordinates = await getGeocode(city);

    if (!coordinates) {
        console.log("Couldn't find the location")
    }

    const weatherData = await getWeatherData(coordinates.lat, coordinates.lon);
    displayWeather(weatherData);
}

if (process.argv[1].includes('index.js')) {
    handleCommandLine();
}