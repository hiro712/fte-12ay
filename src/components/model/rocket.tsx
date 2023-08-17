import { FC, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF as StdlibGLTF } from 'three-stdlib';
import { Mesh } from 'three';

const Model: FC = () => {
  const gltf: StdlibGLTF = useGLTF('/model.gltf', true);

  return <primitive object={gltf.scene} />;
};

export const Rocket: FC = () => {
  const rocketRef = useRef<Mesh>(null!);
  const [angle, setAngle] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle([
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    const rocket = rocketRef.current;
    if (!rocket) return;
    // rocket.rotation.x = Math.PI* 3/2;
    // rocket.rotation.y = Math.PI / 4;
    // rocket.rotation.z = 0;
    rocket.rotation.x = angle[0];
    rocket.rotation.y = angle[1];
    rocket.rotation.z = angle[2];
  });

  return (
    <mesh ref={rocketRef}>
      <Model />
      {/* <boxBufferGeometry args={[1, 1, 1]} />
			<meshPhongMaterial color="aqua" /> */}
    </mesh>
  );
};
