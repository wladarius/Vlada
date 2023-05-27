// WeatherService.js
const API_KEY = '023129cf465d4d9e9a0102129232705';

export async function getWeatherData(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

