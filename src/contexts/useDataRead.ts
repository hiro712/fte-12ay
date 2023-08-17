import { getRefDB } from '@/services/database';
import { FlightData } from '@/types/data';
import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useDataRead = () => {
  const [key, setKey] = useState<string | null>(null);
  const [contents, setContents] = useState<FlightData[]>([]);
  const [currentContent, setCurrentContent] = useState<FlightData | null>(null);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [isArchiving, setIsArchiving] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (contents.length === 0) return;
    setCurrentContent(contents[contents.length - 1]);
  }, [contents]);

  const readData = async () => {
    if (!key) {
      toast.error('キーが設定されていません');
      return;
    }
    setIsReading(true);
    try {
      onValue(getRefDB('data/' + key), (snapshot) => {
        setContents([]);
        const data = snapshot.val();
        if (!data) {
          toast.error('データが存在しません');
          return;
        }
        if (data.contents != '') {
          setContents(JSON.parse(data.contents));
        } else {
          setContents([]);
        }
      });
    } catch (e) {
      console.log('エラー', e);
      toast.error('読み込みに失敗しました');
      setIsReading(false);
    }
  };

  const archiveData = async (contents: string) => {
    setIsArchiving(true);
    try {
      // eslint-disable-next-line no-constant-condition
      const data = (contents = !'' ? JSON.parse(contents) : []) as FlightData[];
      toast.success('アーカイブの読み取りを開始しました');
      for (let i = 1; i < data.length; i++) {
        const prev = data[i - 1];
        const current = data[i];
        const during =
          new Date(current.time).getTime() - new Date(prev.time).getTime();
        if (during < 0) {
          toast.error('データが不正です');
        } else {
          setCurrentContent(current);
          await new Promise((resolve) => setTimeout(resolve, during));
        }
        setProgress((i / data.length) * 100);
      }
      toast.success('アーカイブの読み取りが完了しました');
      setIsArchiving(false);
      setProgress(0);
    } catch (e) {
      console.log('エラー', e);
      toast.error('アーカイブの読み取りに失敗しました');
      setIsArchiving(false);
      setProgress(0);
    }
  };

  return {
    setKey,
    readData,
    archiveData,
    isReading,
    isArchiving,
    progress,
    contents,
    currentContent,
    setCurrentContent,
  };
};
