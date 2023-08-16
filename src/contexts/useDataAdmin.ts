import { getRefDB, pushByRefDB } from '@/services/database';
import { FlightData, ProjectData } from '@/types/data';
import dayjs from 'dayjs';
import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useDataAdmin = () => {
  const [key, setKey] = useState<string | null>(null);
  const [isApploading, setIsAppLoading] = useState<boolean>(false);
  const [contents, setContents] = useState<FlightData[]>([]);
  const [currentContent, setCurrentContent] = useState<FlightData | null>({
    mode: 1,
    pin: 1,
    height: 340,
    latitude: 40.1231,
    longitude: 140.1231,
    time: dayjs().format('HH時mm分ss秒'),
  });
  const [isReading, setIsReading] = useState<boolean>(false);

  useEffect(() => {
    if (contents.length === 0) return;
    setCurrentContent(contents[contents.length - 1]);
  }, [contents]);

  const initData = async () => {
    const name = prompt('プロジェクト名を入力してください');
    if (!name) {
      toast.error('キャンセルされました');
      return;
    }
    const data: ProjectData = {
      name: name || 'no name',
      contents: '',
      isApploading: false,
    };
    const promise = new Promise((resolve, reject) => {
      pushByRefDB('data', data)
        .then((key_) => {
          setKey(key_);
          resolve(key_);
        })
        .catch((error) => {
          console.log('エラー', error);
          reject(error);
        });
    });

    toast.promise(promise, {
      loading: '作成中',
      success: (key_) => `作成しました(ID: ${key_})`,
      error: '作成に失敗しました',
    });
  };

  const startAppload = () => {
    setIsAppLoading(true);
    toast.success('アップロードを開始しました');
  };

  const endAppload = () => {
    setIsAppLoading(false);
    toast.success('アップロードを停止しました');
  };

  const readData = async () => {
    setIsReading(true);
    setContents([]);
    try {
      onValue(getRefDB('data/' + key), (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          toast.error('データが存在しません');
          return;
        }
        setContents(JSON.parse(data.content));
      });
    } catch (e) {
      console.log('エラー', e);
      toast.error('読み込みに失敗しました');
      setIsReading(false);
    }
  };

  return {
    key,
    isApploading,
    initData,
    startAppload,
    endAppload,
    readData,
    isReading,
    contents,
    currentContent,
  };
};
