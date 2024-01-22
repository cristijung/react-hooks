import { useState, useEffect } from 'react';

interface CounterProps {
  initialCount: number;
}

const Counter = ({ initialCount }: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.log('Componente montado');

    return () => {
      console.log('Componente desmontado');
    };
  }, []);

  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
    </div>
  );
};

export default Counter;
