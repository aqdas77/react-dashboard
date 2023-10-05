const API_KEY = '7749c8f003816635839e15babc10c4f1'; 
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast';


function fetchWeatherData(cityName) {
  return fetch(`${BASE_URL}?q=${cityName}&APPID=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        alert("Input valid City Name");
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}
function fetchWeatherForecast(cityName) {
  return fetch(`${FORECAST_BASE_URL}?q=${cityName}&appid=${API_KEY}&cnt=40`)
    .then((response) => {
      if (!response.ok) {
        alert("Input valid City Name");
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

function getFormattedData(weatherData,degree) {
  
  const defaultValues = {
    date: "Tuesday,1 January",
    weatherType: "Clouds",
    city: "New Delhi",
    country: "India",
    temperature: 25,
    feel_like: 25,
    high: 25,
    low: 25,
    icon: "04d",
  };

  
  const {
    dt,
    timezone,
    weather,
    name,
    sys,
    main: { temp, feels_like, temp_max, temp_min },
  } = weatherData || {};

  // Get local date
  const utcTimestamp = dt * 1000;
  const timezoneOffsetInSeconds = timezone;
  const localTimestamp = utcTimestamp + timezoneOffsetInSeconds * 1000;
  const date = new Date(localTimestamp);
  const formattedDateTime = `${date.toUTCString()}`;
  // Update values if available
  if (weather && weather.length > 0) {
    defaultValues.weatherType = weather[0].main;
    defaultValues.icon = weather[0].icon;
  }
  if (name) defaultValues.city = name;
  if (sys && sys.country) defaultValues.country = sys.country;
  if (temp && degree==="Celsius") defaultValues.temperature = temp-273.15;
  if(temp && degree==="Fahrenheit") defaultValues.temperature = 1.8*(temp-273.15)+32;
  if (feels_like && degree==="Celsius") defaultValues.feel_like = feels_like-273.15;
  if (feels_like && degree==="Fahrenheit") defaultValues.feel_like = 1.8*(feels_like-273.15)+32;
  if (temp_max && degree==="Celsius") defaultValues.high = temp_max-273.15;
  if (temp_max && degree==="Fahrenheit") defaultValues.high = 1.8*(temp_max-273.15)+32;
  if (temp_min && degree==="Celsius") defaultValues.low = temp_min-273.15;
  if (temp_min && degree==="Fahrenheit") defaultValues.low =  1.8*(temp_min-273.15)+32;
  if(formattedDateTime) defaultValues.date=formattedDateTime;

  return defaultValues;
}

function getHourlyFormattedForecastData(foreCast,degree)
{
  const foreCastData= foreCast.list.slice(0, 5).map(item=>{
  const dateTime = item.dt_txt.split(" "); 
  const timeParts = dateTime[1].split(":"); 
  const hour = timeParts[0]; 
  const minute = timeParts[1]; 
  const time = `${hour}:${minute}`;
  var temperature=item.main.temp;
  if(degree==="Celsius") temperature=temperature-273.15;
  if(degree==="Fahrenheit") temperature=1.8*(temperature-273.15)+32;
    return {
      time,
      icon: item.weather[0].icon,
      temperature : temperature.toFixed(2),
    }
  });
  return foreCastData;
}


function getDailyFormattedForecastData(foreCast, degree) {
  const foreCastData = foreCast.list.filter((_, index) => index % 7 === 0).map(item => {
    const dateTime = item.dt_txt.split(" ");
    const dateParts = dateTime[0];
    const date = new Date(dateParts);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    let temperature = item.main.temp;

    if (degree === "Celsius") {
      temperature = temperature - 273.15;
    }
    if (degree === "Fahrenheit") {
      temperature = 1.8 * (temperature - 273.15) + 32;
    }

    return {
      dayOfWeek,
      icon: item.weather[0].icon,
      temperature: temperature.toFixed(2),
    };
  });

  return foreCastData;
}

export { fetchWeatherData,fetchWeatherForecast ,getFormattedData,getHourlyFormattedForecastData,getDailyFormattedForecastData};