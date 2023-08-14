import { pushByRefDB } from '@/services/database';
import { FlightData, ProjectData } from '@/types/data';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useDataAdmin = () => {
  const [key, setKey] = useState<string | null>(null);
  const [isApploading, setIsAppLoading] = useState<boolean>(false);
  const [contents, setContents] = useState<FlightData[]>([]);

  useEffect(() => {
    if (!isApploading) return;
    if (!key) return;
    // データアップロード処理
  }, [isApploading, key]);

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
          console.log(key_);
          setKey(key_);
          resolve(key_);
        })
        .catch((error) => {
          console.log(error);
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
    // データ読み込み処理
    setContents([]);
  };

  return {
    key,
    isApploading,
    initData,
    startAppload,
    endAppload,
    readData,
    contents,
  };
};
