
import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import {fetchWeatherData,getFormattedData,fetchWeatherForecast,getHourlyFormattedForecastData,getDailyFormattedForecastData} from './services/apiService'
import Weather from './components/Weather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';

function App() {
  const [degree,setDegree] = useState("Celsius");
  const [city,setCity] = useState("New Delhi");
  const [data,setData] = useState(null);
  const [foreCastData,setForeCastData]=useState(null);
  const [dailyData,setDailyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherData(city);
        const FormattedData = getFormattedData(weatherData,degree);
        setData(FormattedData);
      } catch (error) {
        console.log(error);
      }
    };
  

    fetchData();
  }, [city,degree]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foreCast = await fetchWeatherForecast(city);
        const formattedData = getHourlyFormattedForecastData(foreCast,degree);
        setForeCastData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
  

    fetchData();
  }, [city,degree]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foreCast = await fetchWeatherForecast(city);
        const formattedData = getDailyFormattedForecastData(foreCast,degree);
        setDailyData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
  

    fetchData();
  }, [city,degree]);
  return (
    <>
     <Navbar/>
     <main className="mx-20">
      <SearchBar degree={degree} setDegree={setDegree} city={city} setCity={setCity}/>
      <Weather data={data}/>
      <HourlyForecast foreCastData={foreCastData} />
      <DailyForecast dailyData={dailyData}/>
     </main>
     
    </>
  );
}

export default App;
