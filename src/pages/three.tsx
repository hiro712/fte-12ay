import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import SkyEnvironment from '@/components/model/skyEnvironment';
import { Rocket } from '@/components/model/rocket';
import { OrbitControls } from '@react-three/drei';

const ThreePage: FC = () => {
  return (
    <Canvas
      camera={{ fov: 20, near: 0.1, far: 600, position: [0, -2, 20] }}
      style={{ height: '70vh', width: '70vw' }}
    >
      <Rocket />
      <directionalLight position={[1, 1, 1]} color={'white'} />
      <ambientLight args={[0xffffff]} intensity={0.8} />
      <OrbitControls />
      <SkyEnvironment />
      <gridHelper />
    </Canvas>
  );
};

export default ThreePage;
