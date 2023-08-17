import { getRefDB } from '@/services/database';
import { ProjectList } from '@/types/data';
import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useProject = () => {
  const [projectLists, setProjectLists] = useState<ProjectList[]>([]);

  useEffect(() => {
    try {
      onValue(getRefDB('data'), (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          toast.error('データが存在しません');
          return;
        }
        setProjectLists([]);
        for (const key in data) {
          const projectList = data[key];
          setProjectLists((prev) => [
            ...prev,
            { project: projectList, key: key },
          ]);
        }
      });
    } catch (e) {
      console.log('エラー', e);
      toast.error('読み込みに失敗しました');
    }
  }, []);

  return { projectLists };
};
