import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LocationSearch from '../components/LocationSearch'
import WeatherCard from '../components/WeatherCard'
import { WeatherCurrent, WeatherLocation, WeatherCurrentModel, WeatherLocationModel } from '../lib/models'
import { WeatherCurrentModelText } from '../lib/modelTexts'
import { getCookie, setCookie, hasCookie } from 'cookies-next';

type WeathersRes = {
  weatherRes: {
    current: {};
    location: {};
    error: {
      message: string;
    }
  }[]
}
export async function getServerSideProps({ req, res }: any) {
  let favoriteCities = [];
  if (hasCookie('favoriteCities', { req, res })) {
    const favoriteCitiesCookie = getCookie('favoriteCities', { req, res }) as string;
    favoriteCities = JSON.parse(favoriteCitiesCookie);
  } else {
    favoriteCities = ['LA', 'London'];
    setCookie('favoriteCities', favoriteCities, { req, res, maxAge: 60 * 60 * 24 * 30 });
  }

  const weather = 
  await Promise.all(favoriteCities.map((city: any) =>
    fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&aqi=no`)
    ))
    .then(response =>
      Promise.all(response.map(res => res.json())
    ))
  
  return {
    props: {
      weatherRes: weather,
    }
  }
}

interface Weather {
  current: WeatherCurrentModel;
  location: WeatherLocationModel;
}
const Home: NextPage<WeathersRes> = ({ weatherRes }) => {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [locationSearchText, setLocationSearchText] = useState('');
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    if (hasCookie('favoriteCities')) {
      const cookie = getCookie('favoriteCities') as string;
      setFavoriteCities(JSON.parse(cookie));
    }
  }, [])

  useEffect(() => {
    const weathers = weatherRes.map(weatherRes => {
      if (weatherRes.error) {
        setFetched(false);
        console.log(weatherRes.error);
        console.log(weatherRes.error.message);
      }
      else {
        const weather: Weather = {
          current: new WeatherCurrent(weatherRes.current),
          location: new WeatherLocation(weatherRes.location),
        }
        return weather;
      }
    });

    if (weathers)
      setWeather(weathers as typeof weather);
    setFetched(true);

  }, [weatherRes])

  const locationSearchOnChangeHandler = (text: string) => {
    setLocationSearchText(text)
  }

  const locationSearchOnClickHandler = async (): Promise<void> => {
    const options = {
      maxAge: 60 * 60 * 24 * 30, // 30 days.
    }
    setFavoriteCities((arr) => [...arr, locationSearchText]);
    setCookie('favoriteCities', JSON.stringify(favoriteCities.concat(locationSearchText)), options);
    
    try {
      const res = await fetch(`/api/weather?name=${locationSearchText}`);
      const weatherRes = await res.json();
      const weather: Weather = {
        current: new WeatherCurrent(weatherRes.current),
        location: new WeatherLocation(weatherRes.location),
      }
      setWeather((arr) => [...arr, weather]);
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  const weatherCardOnClickHandler = (index: number) => {
    console.log("hit", index);
    if (hasCookie('favoriteCities')) {
      const options = {
        maxAge: 60 * 60 * 24 * 30, // 30 days.
      }
      const cookie = getCookie('favoriteCities') as string;
      const favoriteCities = JSON.parse(cookie).filter((city: string, i: number) => i !== index);
      setCookie('favoriteCities', favoriteCities, options);
    }

    setWeather(arr => arr.filter((weather, i) => i !== index));
    setFavoriteCities(arr => arr.filter((city, i) => i !== index))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
      </Head>
      <LocationSearch
        onClick={ locationSearchOnClickHandler }
        onChange={(text: string) => locationSearchOnChangeHandler(text)}
      />
      {fetched && weather && weather.map((w: any, index: number) => {
        return <WeatherCard key={index} onClick={ () => weatherCardOnClickHandler(index) } weather={w} weatherCurrentModelText={ WeatherCurrentModelText } />
      })}
    </div>
  )
}

export default Home
