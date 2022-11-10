import { SliderValue } from "../share/wy-ui/wy-slider/wy-slider-type";

export function limitNumberInRange(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function getPercent(min: number, max: number, val: number): SliderValue {
  return ((val - min) / (max - min)) * 100;
}