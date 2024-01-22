//O componente faz uso dos hooks useState e useEffect do React. 
//useState é utilizado para gerenciar o estado local do componente (no caso, o valor do contador), 
//enquanto useEffect é usado para realizar operações secundárias durante o ciclo de vida do componente

import { useState, useEffect } from 'react';

interface CounterProps {
  initialCount: number;
}

const Counter = ({ initialCount }: CounterProps) => {
    // Estado local para armazenar o valor do contador
  const [count, setCount] = useState(initialCount);

  // Efeito colateral para exibir mensagens no console durante a montagem e desmontagem do componente
  useEffect(() => {
    console.log('Componente montado');

    return () => {
      console.log('Componente desmontado');
    };
  }, []); // O array vazio assegura que o efeito é executado apenas uma vez durante a montagem

  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
    </div>
  );
};

export default Counter;
