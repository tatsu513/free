"use client";

import { z } from "zod";
import { weatherApiSchema } from "./schema";

type Props = {
  city: string;
  weather: z.infer<typeof weatherApiSchema>;
};

export default function Display(props: Props) {
  return (
    <div className="bg-white p-2 rounded shadow-md text-center text-black">
      <h2 className="text-xl font-bold">{props.city}</h2>
      <p className="text-lg">{props.weather.weather[0].description}</p>
      <p className="text-2xl font-bold">
        {Math.round(props.weather.main.temp)}°C
      </p>
      <p className="text-sm">
        （最低気温: {Math.round(props.weather.main.temp_min)}°C / 最高気温:{" "}
        {Math.round(props.weather.main.temp_max)}°C）
      </p>
      <p>風速: {props.weather.wind.speed} m/s</p>
      <p>湿度: {props.weather.main.humidity}%</p>
    </div>
  );
}
