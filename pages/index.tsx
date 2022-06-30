import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import WeatherCard from './components/WeatherCard'
import { WeatherCurrent, WeatherLocation, WeatherCurrentModel, WeatherLocationModel } from './lib/models'
import { WeatherCurrentModelText } from './lib/modelTexts'

type WeatherRes = {
  weatherRes: {
    current: {};
    location: {};
    error: {
      message: string;
    }
  }
}
export async function getServerSideProps() {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=London&aqi=no
  `);
  const weatherRes: WeatherRes = await res.json();
  return {
    props: {
      weatherRes,
    }
  }
}

interface Weather {
  current: WeatherCurrentModel;
  location: WeatherLocationModel;
}
const Home: NextPage<WeatherRes> = ({ weatherRes }) => {
  const [weather, setWeather] = useState<any>({});
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    if (weatherRes.error) {
      setFetched(false);
      console.log(weatherRes.error);
      console.log(weatherRes.error.message);
    }
    else {
      const weatherCurrent = new WeatherCurrent(weatherRes.current);
      const weatherLocation = new WeatherLocation(weatherRes.location);
      const weather = {
        current: weatherCurrent,
        location: weatherLocation,
      }

      setWeather(weather);
      setFetched(true);
    }
  }, [weatherRes])

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
      </Head>
      <div>
        {fetched && <WeatherCard weather={weather} weatherCurrentModelText={WeatherCurrentModelText} />}
      </div>
    </div>
  )
}

export default Home
