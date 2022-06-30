import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import lofiImg from '../../public/maxresdefault.jpg';
import { WeatherCurrentModel, WeatherLocationModel } from '../models';

interface WeatherCardProps {
  weather: {
    current: WeatherCurrentModel;
    location: WeatherLocationModel;
  },
  weatherCurrentModelText: {
    [key: string]: string,
},
}
export default function WeatherCard(props: WeatherCardProps) {
  const [current, setCurrent] = useState(props.weather.current);
  const [location, setLocation] = useState(props.weather.location);
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={lofiImg.src}
          alt="lofi image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Country: {location.country}
          </Typography>
          {Object.entries(current).map(([key, value], index) => {
            return <Typography variant="body2" color="text.secondary" key={index}>{props.weatherCurrentModelText[key]}: {value}</Typography>
          })}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
