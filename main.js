import { getWeatherData } from './WeatherService.mjs';
import { updateWeatherDisplay } from './DOMManipulator.mjs';

document.getElementById('location-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value;

  try {
    const weatherData = await getWeatherData(location);
    updateWeatherDisplay(weatherData);
  } catch (error) {
    console.error('Error retrieving weather data:', error);
  }
});
