import { useState, useEffect } from 'react';

interface ClockProps {
  timeZone: string;
}

const Clock = ({ timeZone }: ClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { timeZone });

  return (
    <div>
      <p>Hora ({timeZone}): {formattedTime}</p>
    </div>
  );
};

export default Clock;
