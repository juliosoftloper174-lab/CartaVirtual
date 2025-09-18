import { useState, useEffect } from 'react';

const useImageSize = (src) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.src = src;
  }, [src]);

  return dimensions;
};

export default useImageSize;
