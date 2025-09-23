import { api_key } from "./api_key.js";
import promptSync from 'prompt-sync';
const promp = promptSync;

async function getStatusCode(url) {
    if (typeof url !== 'string') {
        console.error('Incorect data type. Please return a string');
    }
    try {
        const response = await fetch(url);
        return response.status;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getGeocode(city) {
    const geocode_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`;
    const geocodeStatusCode = await getStatusCode(geocode_url);
    
    if (geocodeStatusCode !== 200) {
        console.error("Couldn't access geocode_url");
    }
    try {
        const geocodeResponse = await fetch(geocode_url);
        const jsonData = await geocodeResponse.json();
        
        if (jsonData.length === 0) {
            console.error("No location found for the:", city);
            return null;
        }
        
        const loctaionData = jsonData[0];
        return{
            lat: loctaionData.lat,
            lon: loctaionData.lon,
        };

    } catch (error) {
        console.log('Error:', error)
        return null;
    }
}

async function getWeatherData(lat, lon) {
    const weatherData_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const weatherDataStatusCode = await getStatusCode(weatherData_url);

    if (weatherDataStatusCode !== 200) {
        console.error("Couldn't access weatherData_url");
        return null;
    }

    try {
        const weatherDataResponse = await fetch(weatherData_url);
        const jsonData = await weatherDataResponse.json();

        if (jsonData.length === 0) {
            console.error(`No weather data for the: ${lat} and ${lon}`)
            return null;
        }
    
        return jsonData;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
}
async function returnAnswer() {
    const coordinates = await getGeocode('New York');
    if (coordinates) {
        const weather = await getWeatherData(coordinates.lat, coordinates.lon);
        console.log(weather);
    }
} //to display a return from getWeatherData. Remove later

returnAnswer();