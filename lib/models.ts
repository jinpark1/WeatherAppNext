export interface WeatherCurrentModel {
  tempC: number;
  tempF: number;
  windMph: number;
  windKph: number;
  uv: number;
}

export interface WeatherLocationModel {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tzId: string;
  localtimeEpoch: number;
  localtime: string;
}

export class WeatherCurrent implements WeatherCurrentModel {
  tempC: number;
  tempF: number;
  windMph: number;
  windKph: number;
  uv: number;
  constructor(data: any) {
    this.tempC = data.temp_c;
    this.tempF = data.temp_f;
    this.windMph = data.wind_mph;
    this.windKph = data.wind_kph;
    this.uv = data.uv;
  }
}

export class WeatherLocation implements WeatherLocationModel {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tzId: string;
  localtimeEpoch: number;
  localtime: string;
  constructor(data: any) {
    this.name = data.name;
    this.region = data.region;
    this.country = data.country;
    this.lat = data.lat;
    this.lon = data.lon;
    this.tzId = data.tz_id;
    this.localtimeEpoch = data.localtime_epoch;
    this.localtime = data.localtime;
  }
}