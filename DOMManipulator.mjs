export function updateWeatherDisplay(weatherData) {
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
  
    temperatureElement.textContent = `${weatherData.current.temp_c}°C`;
    descriptionElement.textContent = weatherData.current.condition.text;
  }