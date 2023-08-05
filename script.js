const form = document.getElementById('formInput');
const weatherNews = document.getElementById('displayData');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.getElementById('location').value;
  getData(location);
});

async function getData(location) {
  const unit = 'metric';
  const apiKey = '45d467672ce5d759d715a7874f294910';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

  try {
    // loading message
    weatherNews.textContent = 'Loading...';

    const response = await fetch(url);
    const data = await response.json();

    // Process and display data
    const weatherData = processData(data);
    displayData(weatherData);
  } catch (err) {
    weatherNews.textContent = 'Incorrect inputs. Please try again';
    console.error('Error:', err);
  }
}

function processData(data) {
  return {
    location: data.name,
    temperature: data.main.temp,
    maxTemp: data.main.temp_max,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windSlope: data.wind.deg,
    pressure: data.main.pressure,
    country: data.sys.country,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

function displayData(data) {
  const {
    location,
    temperature,
    description,
    icon,
    humidity,
    windSpeed,
    pressure,
    country,
    windSlope,
    maxTemp,
  } = data;
  const weatherHTML = `
  <p>Country: ${country}</p>
  <p>Temperature: ${temperature}°C</p>
    <p>Location: ${location}</p>
    <p>Max temprature: ${maxTemp}</p>
    <p>Location: ${location}</p>
    <p>Humidity: ${humidity}°C</p>
    <p>Wind speed: ${windSpeed}km/h</p>
    <p>Pressure: ${pressure}atm</p>
    <p>Wind Slope: ${windSlope}deg</p>
    <p>Description: ${description}</p>
    <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
  `;
  weatherNews.innerHTML = weatherHTML;
}
