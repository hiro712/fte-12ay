import { FlightData } from '@/types/data';
import dayjs from 'dayjs';

export const lines2FlightData = (lines: string[]): FlightData[] => {
  const flightData: FlightData[] = [];
  lines.forEach((line) => {
    const keys = ['a', 'b', 'c', 'd', 'e', 'f'];
    const converted: string[] = Array(keys.length).fill('');

    for (let i = 0; i < keys.length; i++) {
      const char = keys[i];
      const nextChar = keys[i + 1] || '';

      const regex = new RegExp(
        `${char}(.*?)${nextChar ? `(?:${nextChar})` : '$'}`,
        's',
      );
      const match = line.match(regex);

      if (match) {
        converted[i] = match[1];
      }
    }
    const data: FlightData = {
      mode: isNaN(Number(converted[0])) ? 0 : Number(converted[0]),
      pin: isNaN(Number(converted[1])) ? 0 : Number(converted[1]),
      height: isNaN(Number(converted[2])) ? 0 : Number(converted[2]),
      latitude: isNaN(Number(converted[3])) ? 0 : Number(converted[3]),
      longitude: isNaN(Number(converted[4])) ? 0 : Number(converted[4]),
      time: dayjs(converted[5]).format('HH時mm分ss秒'),
    };
    flightData.push(data);
  });
  return flightData;
};

export const modeCode2Text = (mode: number): string => {
  switch (mode) {
    case 0:
      return '自動飛行';
    case 1:
      return '手動飛行';
    case 2:
      return '自動着陸';
    case 3:
      return '自動離陸';
    default:
      return '不明';
  }
};

export const testSerialData = async () => {
  const a = randomInt(3).toString();
  const b = randomInt(1).toString();
  const c = randomInt(1000).toString();
  const d = '38.' + randomInt(999999).toString();
  const e = '140.' + randomInt(999999).toString();
  const value = 'a' + a + 'b' + b + 'c' + c + 'd' + d + 'e' + e;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { value, done: false };
};

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}
