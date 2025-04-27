// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const locationName =  req.query.name as string;
  if (!locationName) {
    res.statusCode = 400;
    res.end("Please provide location name.");
  } else {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${locationName}&aqi=no`);
        const weather = await response.json();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(weather))
      } catch (error) {
        res.end(error)
      }
    }
    
    return fetchWeather();
  }
}
