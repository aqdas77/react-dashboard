import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { RiCelsiusLine } from "react-icons/ri";
import { RiFahrenheitLine } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";



const SearchBar = ({degree,setDegree,city,setCity}) => {
   const [query,setQuery]=useState("");

   const handleSearch = (e) => {
    e.preventDefault(); 
    const trimmedQuery = query.trim();
  
    if (!trimmedQuery) {
      alert("Please enter a valid city name.");
      return;
    }
    setCity(trimmedQuery);
  };

  return (
    
    <div className="flex flex-wrap justify-center my-4">
      <div className="flex  justify-center  ">
        <input
          className="border-black border rounded-full px-6 py-2 mr-2 w-64"
          type="text"
          placeholder="Search City..."
          value={query}
          onChange={(e)=>setQuery(e.currentTarget.value)}
        />
        <button onClick={handleSearch}>
          <BsSearch className="text-black  " size={28} />
        </button>
      </div>
      <div className="flex items-center mx-8 my-4">
      <button
        className={`flex items-center ${degree === 'Celsius' ? 'text-blue-500' : ''}`}
        onClick={() => setDegree('Celsius')}
      >
        <RiCelsiusLine size={24} />
      </button>
      <RxDividerVertical size={24}/>
      <button
        className={`flex items-center ${degree === 'Fahrenheit' ? 'text-blue-500' : ''}`}
        onClick={() => setDegree('Fahrenheit')}
      >
        <RiFahrenheitLine size={24} />
      </button>
    </div>
      </div>
   
  )
}

export default SearchBar