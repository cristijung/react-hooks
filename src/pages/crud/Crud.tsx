//Componente Funcional e Hooks:
//O componente Login é um componente funcional que utiliza hooks como useState e useEffect.
//Ele utiliza o estado local para armazenar a lista de posts (posts), 
//os detalhes de um novo post (newPost), e o post atualmente em edição (editingPost).

import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

//Chamadas à API:
// --O método fetchPosts é chamado no momento em que o componente é montado (useEffect). 
//ele utiliza a biblioteca Axios para fazer uma requisição GET à API JsonPlaceholder e atualiza o estado local posts com os três primeiros posts.
// -- o método handleAddPost lida com a adição e edição de posts. 
//ele faz requisições POST ou PUT à API, dependendo se há um editingPost definido ou não. Em caso de edição, ele atualiza o estado local com os novos detalhes do post.

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const Crud = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    // fetch posts on component mount
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data.slice(0, 3)); // limitando para 3 posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

//Manipulação de Eventos:
// o código lida com a entrada do usuário através de eventos de mudança (onChange) e botões de clique (onClick). 
// os métodos handleInputChange, handleAddPost, handleEditPost, e handleDeletePost são responsáveis por manipular esses eventos.
 //método para inserir dados no input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };


 //método para add ou editar o post
// a renderização condicional é usada para decidir se o componente está no modo de edição ou adição. Isso é feito com base na existência de um editingPost.
  const handleAddPost = async () => {
    try {
      if (editingPost) {
        //se o user estiver editando o post, a requisição a ser feita é PUT
        //para atualizar o post existente q está sendo editado
        await axios.put(`${API_URL}/${editingPost.id}`, newPost);
        setPosts(prevPosts =>
          prevPosts.map(post => (post.id === editingPost.id ? { ...post, ...newPost } : post))
        );
        setEditingPost(null);
      } else {
        // se não estiver editando, faz uma requisição POST para adicionar um novo post
        const response = await axios.post(API_URL, newPost);
        setPosts(prevPosts => [...prevPosts, response.data]);
      }
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error('Error adding/editing post:', error);
    }
  };
  

  // o estado é gerenciado corretamente usando o hook useState. 
  //o estado é atualizado de forma imutável, garantindo que as atualizações do estado não modifiquem diretamente o estado anterior.
  const handleEditPost = (post: Post) => {
    setNewPost({ title: post.title, body: post.body });
    setEditingPost(post);
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await axios.delete(`${API_URL}/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>CRUD Exemplo</h1>
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
              <button onClick={() => handleEditPost(post)}>Edit</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>{editingPost ? 'Edit Post' : 'Add Post'}</h2>
        <label>
          Title:
          <input type="text" name="title" value={newPost.title} onChange={handleInputChange} />
        </label>
        <label>
          Body:
          <textarea name="body" value={newPost.body} onChange={handleInputChange} />
        </label>
        <button onClick={handleAddPost}>{editingPost ? 'Save Changes' : 'Add Post'}</button>
        {editingPost && (
          <button onClick={() => setEditingPost(null)}>Cancel Editing</button>
        )}
      </div>
    </div>
  );
};

export default Crud;
