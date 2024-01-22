import { useState, useEffect } from 'react';

//Define uma interface Cat com propriedades id, url e opcionalmente error.
//se deixa opcional em função da API
interface Cat {
  id: string;
  url: string;
  error?: string;  
}

function Gallery() {
    //inicializa o estado cats usando o hook useState com um array vazio como valor inicial.
  const [cats, setCats] = useState<Cat[]>([]);

  //usa o hook useEffect para executar uma operação assíncrona de busca de gatos quando o componente 
  //é montado (devido ao array de dependências vazio []).
  useEffect(() => {

    //é uma função assíncrona que utiliza a API thecatapi.com para buscar imagens de gatos.
    const fetchCats = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
        //Lança um erro se a resposta não estiver OK.
        if (!response.ok) {
          throw new Error('Failed to fetch cats');
        }
        //Converte a resposta para JSON e atualiza o estado cats com os dados recebidos.
        const data: Cat[] = await response.json();
        setCats(data);
      } catch (error) {
        console.error('Error fetching cats:', error);
  
        // atualiza o estado com erro
        //em caso de erro, imprime o erro no console e atualiza o estado cats com uma entrada de erro.
        setCats([{ id: 'error', url: '', error: 'Failed to fetch cats' }]);
      }
    };
  
    fetchCats();
  }, []);

  return (
    <div>
      <h1>Cat Gallery</h1>
      <div>
        {cats.map(cat => (
          <img key={cat.id} src={cat.url} alt={`Cat ${cat.id}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
