import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const BOUD_RATE = 9600;

export const usePort = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [port, setPort] = useState<any>(null);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [breakFlag, setBreakFlag] = useState<boolean>(false);

  useEffect(() => console.log('port', port), [port]);

  const requestPort = async () => {
    if ('serial' in navigator === false) {
      toast.error(
        'デバイスやブラウザがシリアルポートAPIをサポートしていません',
      );
      return;
    }
    // @ts-ignore
    const port_ = await navigator.serial.requestPort();
    setPort(port_);
  };

  const readLine = async () => {
    if (port === null) {
      toast.error('ポートが設定されていません');
      return;
    }

    await port.open({ baudRate: BOUD_RATE }).catch((e: any) => {
      toast.error(`ポートを開く際にエラーが発生しました: ${e}`);
      return;
    });

    const reader = port.readable.getReader();
    try {
      setIsReading(true);
      setLines([]);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done || breakFlag) {
          setBreakFlag(false);
          break;
        }
        console.log('line: ', value);
        setLines((preLines) => [...preLines, value]);
      }
    } catch (e) {
      toast.error(`読み込み中にエラーが発生しました: ${e}`);
    }
    setIsReading(false);
    return;
  };

  const stopRead = () => {
    setBreakFlag(true);
    setPort(null);
  };

  return { requestPort, readLine, stopRead, isReading, lines, port };
};
