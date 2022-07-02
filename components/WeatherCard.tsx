import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import lofiImg from '../public/maxresdefault.jpg';
import { WeatherCurrentModel, WeatherLocationModel } from '../lib/models';

interface WeatherCardProps {
  onClick: () => void;
  weather: {
    current: WeatherCurrentModel;
    location: WeatherLocationModel;
  };
  weatherCurrentModelText: {
    [key: string]: string,
  };
}
export default function WeatherCard(props: WeatherCardProps) {
  const current = props.weather.current
  const location =props.weather.location;
  
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginBottom: '25px',
      }}>
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
        <Button size="small" color="primary" onClick={ () => props.onClick() }>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
