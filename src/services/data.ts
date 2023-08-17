export const modeCode2Text = (mode: number): string => {
  switch (mode) {
    case 0:
      return 'スタンバイ中(正常)';
    case 1:
      // toast.error('フライトピンに異常があります');
      return 'スタンバイ中(異常)';
    case 2:
      return '飛行中(正常)';
    case 3:
      // toast.error('フライトピンに異常があります');
      return '飛行中(異常)';
    case 4:
      return '減速落下中(正常)';
    case 5:
      // toast.error('フライトピンに異常があります');
      return '減速落下中(異常)';
    default:
      return '不明';
  }
};

export const testSerialData = async () => {
  const m = randomInt(6).toString();
  const alt = randomInt(1000).toString();
  const lat = '38.' + randomInt(999999).toString();
  const lon = '140.' + randomInt(999999).toString();
  const x = randomInt(360).toString();
  const y = randomInt(360).toString();
  const z = randomInt(360).toString();
  const value =
    'm' +
    m +
    'alt' +
    alt +
    'lat' +
    lat +
    'lon' +
    lon +
    'x' +
    x +
    'y' +
    y +
    'z' +
    z;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { value, done: false };
};

export function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}
