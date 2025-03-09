"use client";

import { useCallback, useState } from "react";
import SearchCity from "./SearchCity";
import Display from "./Display";
import { z } from "zod";
import { fetchFiveDaysWeather, fetchWeather } from "./action";
import { hourlyWeatherApiSchema, weatherApiSchema } from "./schema";
import { DateTime } from "luxon";

type Weather = z.infer<typeof weatherApiSchema>;

export default function WheatherMain() {
  const [city, setCity] = useState("東京");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<
    z.infer<typeof hourlyWeatherApiSchema>["list"] | null
  >(null);

  const handleSearch = useCallback(async () => {
    try {
      const data = await fetchWeather(city);
      const hourlyData = await fetchFiveDaysWeather(city);
      setWeather(data);
      setHourlyWeather(hourlyData.list);
    } catch (error) {
      console.error("天気情報の取得に失敗しました", error);
    }
  }, [city]);

  return (
    <div className="w-full">
      <SearchCity city={city} setCity={setCity} onSubmit={handleSearch} />
      {weather && <Display city={city} weather={weather} />}
      {hourlyWeather && (
        <div className="grid grid-cols-1 gap-2">
          {hourlyWeather.map((data) => {
            const dateTime = DateTime.fromSeconds(data.dt);
            const isMidnight = dateTime.hour === 0;
            return (
              <div key={data.dt} className="px-2">
                {isMidnight && (
                  <h2 className="text-lg font-bold border-t-1 border-b-1 border-gray-300 mb-2">
                    {dateTime.toFormat("yyyy-MM-dd")}
                  </h2>
                )}
                <p>{dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</p>
                <p>{data.weather[0].description}</p>
                <p>気温: {Math.round(data.main.temp)}℃</p>
                <p>湿度: {data.main.humidity}%</p>
                <p>風速: {Math.round(data.wind.speed)}m/s</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
