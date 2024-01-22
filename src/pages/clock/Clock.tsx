import { useState, useEffect } from 'react';
//O componente faz uso dos hooks useState e useEffect do React. 
//useState é utilizado para gerenciar o estado local do componente, 
//enquanto useEffect é usado para realizar operações secundárias 
//(efeitos colaterais) durante o ciclo de vida do componente.


interface ClockProps {
  timeZone: string;
}

const Clock = ({ timeZone }: ClockProps) => {
    // Estado local para armazenar a data/hora atual
  const [time, setTime] = useState(new Date());

    // Efeito colateral para atualizar a hora a cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Função de limpeza para remover o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); // O array vazio assegura que o efeito é executado apenas uma vez durante a montagem

  // Formata a hora de acordo com a zona de tempo fornecida
//  useState é utilizado para criar uma variável de estado time que armazena a data e hora atuais.
//useEffect é utilizado para realizar operações secundárias. Neste caso, cria um intervalo que atualiza o estado time a cada segundo. 
//O intervalo é limpo quando o componente é desmontado para evitar vazamentos de memória.
//A função toLocaleTimeString é usada para formatar a hora de acordo com a zona de tempo fornecida.
  const formattedTime = time.toLocaleTimeString('pt-BR', { timeZone });

  // Retorna a representação visual do componente
  return (
    <div>
      <p>Hora ({timeZone}): {formattedTime}</p>
    </div>
  );
};

export default Clock;
