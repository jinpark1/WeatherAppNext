// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const search =  req.query.name as string;
  if (!search) {
    res.statusCode = 400;
    res.end("Please provide search name.");
  } else {
    const fetchSearch = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${search}`);
        const searchResult = await response.json();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(searchResult))
      } catch (error: any) {
        res.end(error)
      }
    }
    
    return fetchSearch();
  }
}
