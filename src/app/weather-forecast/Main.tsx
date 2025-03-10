"use client";

import { useCallback, useState } from "react";
import SearchCity from "./SearchCity";
import Display from "./Display";
import { z } from "zod";
import { fetchFiveDaysWeather, fetchWeather } from "./action";
import { hourlyWeatherApiSchema, weatherApiSchema } from "./schema";
import { DateTime } from "luxon";
import Image from "next/image";

type Weather = z.infer<typeof weatherApiSchema>;

export default function WheatherMain() {
  const [city, setCity] = useState("東京");
  const [displayCity, setDisplayCity] = useState("");
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
      setDisplayCity(city);
    } catch (error) {
      console.error("天気情報の取得に失敗しました", error);
    }
  }, [city]);

  return (
    <div className="w-full">
      <SearchCity city={city} setCity={setCity} onSubmit={handleSearch} />
      {weather && <Display city={displayCity} weather={weather} />}
      {hourlyWeather && (
        <div className="flex gap-2">
          {hourlyWeather.map((data) => {
            const dateTime = DateTime.fromSeconds(data.dt);
            const include = dateTime.hour % 6 === 0;
            if (!include) {
              return null;
            }
            const isMidnight = dateTime.hour === 0;
            return (
              <div key={data.dt} className="px-2 flex flex-col items-center">
                <p className={isMidnight ? "" : "text-transparent"}>
                  {dateTime.toFormat("M/dd")}
                </p>
                <p>{dateTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</p>
                <Image
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].description}
                  height={60}
                  width={60}
                />
                <div className="flex items-center gap-2">
                  <p className="font-bold">{Math.round(data.main.temp_max)}°</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
