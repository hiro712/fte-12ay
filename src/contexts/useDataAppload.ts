import { pushByRefDB, updateByRefDB } from '@/services/database';
import { FlightData, ProjectData } from '@/types/data';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const lines2FlightData = (lines: string[]): FlightData[] => {
  const flightData: FlightData[] = [];
  lines.forEach((line) => {
    const keys = ['m', 'alt', 'lat', 'lon', 'x', 'y', 'z', 'time'];
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
      height: isNaN(Number(converted[1])) ? 0 : Number(converted[1]),
      latitude: isNaN(Number(converted[2])) ? 0 : Number(converted[2]),
      longitude: isNaN(Number(converted[3])) ? 0 : Number(converted[3]),
      angle: {
        x: isNaN(Number(converted[4])) ? 0 : Number(converted[4]),
        y: isNaN(Number(converted[5])) ? 0 : Number(converted[5]),
        z: isNaN(Number(converted[6])) ? 0 : Number(converted[6]),
      },
      time: converted[7],
    };
    flightData.push(data);
  });
  return flightData;
};

export const useDataAppload = () => {
  const [key, setKey] = useState<string | null>(null);
  const [isApploading, setIsAppLoading] = useState<boolean>(false);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (lines.length === 0) return;
    if (key === null || '') return;
    if (!isApploading) return;
    const data = lines2FlightData(lines);
    console.log('data', data);
    updateByRefDB('data/' + key + '/contents', JSON.stringify(data));
  }, [lines, key, isApploading]);

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
    if (key === null) return;
    setIsAppLoading(true);
    updateByRefDB('data/' + key + '/isApploading', true);
    toast.success('アップロードを開始しました');
  };

  const endAppload = () => {
    if (key === null) return;
    setIsAppLoading(false);
    updateByRefDB('data/' + key + '/isApploading', false);
    toast.success('アップロードを停止しました');
  };

  return {
    key,
    isApploading,
    initData,
    startAppload,
    endAppload,
    setLines,
  };
};
