import { testSerialData } from '@/services/data';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// const BOUD_RATE = 115200;

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
    try {
      // @ts-ignore
      const port_ = await navigator.serial.requestPort();
      setPort(port_);
    } catch (e) {
      toast.error('キャンセルされました');
      return;
    }
  };

  const readLine = async () => {
    if (port === null) {
      toast.error('ポートが設定されていません');
      return;
    }

    // await port.open({ baudRate: BOUD_RATE }).catch((e: any) => {
    //   toast.error(`ポートを開く際にエラーが発生しました: ${e}`);
    //   return;
    // });

    try {
      // const reader = port.readable.pipeThrough(new TextDecoderStream()).getReader();
      setIsReading(true);
      setLines([]);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // const { value, done } = await reader.read();
        const { value, done } = await testSerialData();
        if (done || breakFlag) {
          setBreakFlag(false);
          break;
        }
        const valueAddTime = value + 'time' + new Date().toISOString();
        setLines((preLines) => [...preLines, valueAddTime]);
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
