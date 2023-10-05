import React from 'react';

const Weather = ({ data }) => {
    if (!data) {
        // Handle the case when data is null (loading or no data available)
        return <div>Loading...</div>;
      }
  const iconUrlFromCode = (icon) =>
    `http://openweathermap.org/img/wn/${icon}@2x.png`;
  
  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-center text-lg my-3'>
        {data.date}</div>
      <div className='flex justify-center text-2xl my-3'>
        {data.city}, {data.country}
      </div >
      <div className='flex justify-center text-2xl my-3'>
        {data.weatherType}</div>
        <div className='flex flex-wrap justify-between  '>
  <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 items-center justify-center'>
    <img src={iconUrlFromCode(data.icon)} alt="Weather Icon" className="w-24 h-24" />
  </div>
  <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 items-center justify-center text-4xl'>
    {data.temperature.toFixed(2)}°
  </div>
  <div className='flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 my-4 flex-col  items-center'>
    <div>Feel Like: {data.feel_like.toFixed(2)}</div>
    <div>Low: {data.low.toFixed(2)}</div>
    <div>High: {data.high.toFixed(2)}</div>
  </div>
</div>

    </div>
  );
};

export default Weather;


