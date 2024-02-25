import { useEffect, useRef } from 'react';
import Earth3D from './Earth3D.ts';
import earthMock from './earth.mock.ts';
const Earth = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && !ref.current.hasChildNodes()) {
      new Earth3D(
        {
          data: earthMock,
          textures: {},
          earth: {
            radius: 2,
            isRotation: true,
            quality: 10,
            backgroundParticlesRadius: 2.8
          },

          baseCamera: {
            x: 0.4,
            y: 4.2,
            z: -0.3,
            cameraPos: 3.5
          },
          satellite: {
            show: true,
            rotateSpeed: 2,
            size: 2,
            number: 7
          },
          flyLine: {
            color: 1,
            speed: 2,
            flyLineColor: 2
          }
        },
        ref.current
      );
    }
  }, []);

  return (
    <>
      <div ref={ref}></div>
    </>
  );
};

export default Earth;
