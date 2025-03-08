"use client";

import { useCallback, useState } from "react";
import SearchCity from "./SearchCity";
import Display from "./Display";
import { z } from "zod";
import { fetchWeather } from "./action";
import { weatherApiSchema } from "./schema";

type Weather = z.infer<typeof weatherApiSchema>;

export default function WheatherMain() {
  const [city, setCity] = useState("東京");
  const [weather, setWeather] = useState<Weather | null>(null);
  const handleSearch = useCallback(async () => {
    try {
      const data = await fetchWeather(city);
      console.log({ data });
      setWeather(data);
    } catch (error) {
      console.error("天気情報の取得に失敗しました", error);
    }
  }, [city]);
  return (
    <div>
      <SearchCity city={city} setCity={setCity} onSubmit={handleSearch} />
      {weather && <Display city={city} weather={weather} />}
    </div>
  );
}
