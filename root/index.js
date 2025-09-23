import { getWeatherData } from './packages/weather_data.js';
import readline from 'readline';

function displayWeather(weatherData) {
    if (!weatherData) {
        console.log('❌ Could not retrieve weather data');
        return null;
    }

    console.log('\n  Weather Information');
    console.log('=======================');
    console.log(`📍 Location: ${weatherData.name}, ${weatherData.sys.country}`);
    console.log(`🌡️  Temperature: ${Math.round(weatherData.main.temp)}°C (Feels like ${Math.round(weatherData.main.feels_like)}°C)`);
    console.log(`📝 Condition: ${weatherData.weather[0].description}`);
    console.log(`💧 Humidity: ${weatherData.main.humidity}%`);
    console.log(`💨 Wind: ${weatherData.wind.speed} m/s`);
    console.log(`👁️  Visibility: ${weatherData.visibility / 1000} km`);
    console.log('=======================\n');
}

async function handleCommandLine() {
    const args = process.argv.slice(2);
}