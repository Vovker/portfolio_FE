import { useRef } from 'react';

const Earth = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ref}></div>
    </>
  );
};

export default Earth;
