import { Environment, useEnvironment } from '@react-three/drei';

const SkyEnvironment = () => {
  const envMap = useEnvironment({
    files: '/kloofendal_48d_partly_cloudy_puresky_4k.hdr',
  });

  return (
    <>
      <Environment map={envMap} background />
    </>
  );
};

export default SkyEnvironment;
