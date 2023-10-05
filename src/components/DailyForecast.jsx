import React from 'react'


const DailyForecast = ({ dailyData }) => {
    const uniqueDailyData = dailyData? dailyData.filter((item, index, self) =>
    self.findIndex((d) => d.dayOfWeek === item.dayOfWeek) === index
  ) : "";

    const iconUrlFromCode = (icon) =>
    `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 my-4">
  <span className="border-b-2 border-black bold my-4">HOURLY FORECAST</span>
</h1>
<div className="flex flex-wrap gap-4">
        {uniqueDailyData && uniqueDailyData.map((item, index) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/6"
            key={index}
          >
            <h1 className="text-lg font-semibold">{item.dayOfWeek}</h1>
            <img
              src={iconUrlFromCode(item.icon)}
              alt="Weather Icon"
              className="w-24 h-24 mx-auto my-4"
            />
            <h1 className="text-xl">{item.temperature} °</h1>
          </div>
        ))}
      </div>
        </div>
     
    );
  };
  
 
  

export default DailyForecast