import { z } from "zod";

export const weatherApiSchema = z.object({
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
  sys: z.object({
    sunrise: z.number(),
    sunset: z.number(),
  }),
  weather: z.array(
    z.object({
      description: z.string(),
    })
  ),
  wind: z.object({
    speed: z.number(),
  }),
});
