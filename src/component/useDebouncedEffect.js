import { useState, useEffect } from 'react';

export const  useDebouncedEffect=(value, wait) =>{
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, wait]);

  return debouncedValue;
}