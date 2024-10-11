import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import cloudy_icon from '../assets/cloudy.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import rainy_icon from '../assets/rainy.png'
import snow_icon from '../assets/snow.png'
import search_icon from '../assets/search.png'
import sun_icon from '../assets/sun.png'
import windy_icon from '../assets/windy.png'

const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": sun_icon,
        "01n": sun_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": rain_icon,
        "04n": rain_icon,
        "09d": rainy_icon,
        "09n": rainy_icon,
        "10d": rainy_icon,
        "10n": rainy_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }

    const search = async (city)=> {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon

            })
        } catch (error) {
             setWeatherData(false);
             console.error("Error in fetching data")
        }
    }

    useEffect(()=>{
        search('London');
    },[])

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type='text' placeholder='Search' />
                <img src={search_icon} alt="search" onClick={()=>search(inputRef.current.value)} />
            </div>
            {weatherData?<>
                <img src={weatherData.icon} alt="clear" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°c</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="humidity" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windy_icon} alt="windy" />
                    <div>
                        <p>{weatherData.windSpeed} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </>:<></>}

            
        </div>
    )
}

export default Weather
