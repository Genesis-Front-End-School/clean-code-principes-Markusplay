import { useMemo, useState } from 'react';

export function useTime(duration: number) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useMemo(() => {
    const calculatedMinutes = Math.floor(duration / 60);
    const calculatedSeconds = duration - calculatedMinutes * 60;
    setMinutes(calculatedMinutes);
    setSeconds(calculatedSeconds);
  }, [duration]);

  return [minutes, seconds];
}
