import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind, Loader2 } from 'lucide-react';

export default function WeatherWidget({ lat, lng }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lng) return;
    
    setLoading(true);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,uv_index&timezone=auto`)
      .then(res => res.json())
      .then(data => {
        setWeather(data.current);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching weather:", err);
        setLoading(false);
      });
  }, [lat, lng]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!weather) return null;

  const getWeatherIcon = (code) => {
    if (code <= 3) return <Sun className="w-5 h-5 text-amber-500" />;
    if (code <= 48) return <Cloud className="w-5 h-5 text-slate-500" />;
    if (code <= 67) return <CloudRain className="w-5 h-5 text-blue-500" />;
    if (code <= 77) return <CloudSnow className="w-5 h-5 text-sky-300" />;
    if (code <= 99) return <CloudLightning className="w-5 h-5 text-purple-500" />;
    return <Wind className="w-5 h-5 text-slate-400" />;
  };

  const getWeatherDesc = (code) => {
    if (code === 0) return "Clear sky";
    if (code === 1 || code === 2 || code === 3) return "Partly cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 99) return "Thunderstorm";
    return "Unknown";
  };

  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
          {getWeatherIcon(weather.weather_code)}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Weather</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-slate-900">{weather.temperature_2m}°C</span>
            <span className="text-xs font-semibold text-slate-600">{getWeatherDesc(weather.weather_code)}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">UV Index</p>
        <div className="flex flex-col items-end">
          <span className={`text-sm font-bold ${weather.uv_index > 5 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {weather.uv_index}
          </span>
        </div>
      </div>
    </div>
  );
}
