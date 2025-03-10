"use client";

import { z } from "zod";
import { weatherApiSchema } from "./schema";
import Image from "next/image";
import { DateTime } from "luxon";

type Props = {
  city: string;
  weather: z.infer<typeof weatherApiSchema>;
};

export default function Display(props: Props) {
  const now = DateTime.now();
  return (
    <div className="p-2 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">{props.city}の予報</h2>
      <p>
        {now.toFormat("yyyy-MM-dd")}（{now.weekdayShort}）
      </p>
      <div className="flex items-center gap-4">
        <Image
          src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
          alt={props.weather.weather[0].description}
          height={80}
          width={80}
        />
        <div className="flex gap-4 justify-center items-center">
          <p className="text-4xl font-bold">
            {Math.round(props.weather.main.temp)}°
          </p>
          <div className="text-gray-300">
            <p className="text-sm">
              {Math.round(props.weather.main.temp_min)}~
              {Math.round(props.weather.main.temp_max)}°
            </p>
            <p className="text-sm">風速: {props.weather.wind.speed} m/s</p>
            <p className="text-sm">湿度: {props.weather.main.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
