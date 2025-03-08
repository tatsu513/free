"use server";

import { weatherApiSchema } from "./schema";

export const fetchWeather = async (city: string) => {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=7d5b5d076c3ee739986e7fee6fc1d4bc`
  );
  if (!geoRes.ok) {
    throw new Error("位置情報の取得に失敗しました");
  }
  const geoData = await geoRes.json();
  console.log({ geoData });
  if (geoData.length === 0) {
    throw new Error("指定された都市が見つかりません");
  }

  const { lat, lon } = geoData[0];
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=7d5b5d076c3ee739986e7fee6fc1d4bc&lang=ja`
  );
  if (!weatherRes.ok) {
    throw new Error("天気情報の取得に失敗しました");
  }
  const res = await weatherRes.json();
  const result = weatherApiSchema.safeParse(res);
  if (!result.success) {
    console.log({ err: result.error, res });
    throw new Error("天気情報の変換に失敗しました");
  }
  return result.data;
};
