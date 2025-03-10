"use server";

import sharedEnv from "@/sharedEnv";
import { hourlyWeatherApiSchema, weatherApiSchema } from "./schema";
import { DateTime } from "luxon";

const env = sharedEnv;

const getLatLon = async (city: string) => {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${env.openWeatherApiKey}`
  );
  if (!geoRes.ok) {
    throw new Error("位置情報の取得に失敗しました");
  }
  const geoData = await geoRes.json();
  if (geoData.length === 0) {
    throw new Error("指定された都市が見つかりません");
  }
  return {
    lat: geoData[0].lat,
    lon: geoData[0].lon,
  };
};

// 天気情報を取得する
export const fetchWeather = async (city: string) => {
  const { lat, lon } = await getLatLon(city);

  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${env.openWeatherApiKey}&lang=ja`
  );
  if (!weatherRes.ok) {
    throw new Error("天気情報の取得に失敗しました");
  }
  const res = await weatherRes.json();
  const result = weatherApiSchema.safeParse(res);
  if (!result.success) {
    throw new Error("天気情報の変換に失敗しました");
  }
  return result.data;
};

// 5日間の天気情報を取得する
export const fetchFiveDaysWeather = async (city: string) => {
  const { lat, lon } = await getLatLon(city);

  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${env.openWeatherApiKey}`
  );
  if (!weatherRes.ok) {
    throw new Error("5日間の天気情報の取得に失敗しました");
  }
  const res = await weatherRes.json();
  const result = hourlyWeatherApiSchema.safeParse(res);
  if (!result.success) {
    throw new Error("5日間の天気情報の変換に失敗しました");
  }
  return res;
};
