import { Angle } from '@/types/data';
import { useEffect, useState } from 'react';

export const useAngle = () => {
  const [rotation, setRotation] = useState<Angle>({ x: 0, y: 0, z: 0 });
  const [angle, setAngle] = useState<Angle>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const angle2rotation = async () => {
      for (let i = 0; i < 100; i++) {
        const x = rotation.x + ((angle.x - rotation.x) / 100) * i;
        const y = rotation.y + ((angle.y - rotation.y) / 100) * i;
        const z = rotation.z + ((angle.z - rotation.z) / 100) * i;
        setRotation({ x, y, z });
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    };
    angle2rotation();
  }, [angle]);

  return { rotation, setAngle };
};
