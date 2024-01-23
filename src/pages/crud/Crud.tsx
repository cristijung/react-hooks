import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function Crud() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPosts] = useState({ title: '', body: ''});
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    useEffect(() => {

    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPosts(response.data.sclice(0, 3)); ///slice para limitar a quantidade de posts q vem da API
        } catch (error) {
            console.error('Erro de carregamento', error);
        }
    };
    //método para inserir dados no input
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPosts({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    //método para add ou editar o post
    const handleAddPost = async () => {
        try {
            //se o user estiver editando o post, a requisição a ser feita é PUT
            //para atualizar o post existente q está sendo editado
           if (editingPost) {
            await axios.put(`${API_URL}/${editingPost.id}`, newPost);
            setPosts(prevPosts => 
                prevPosts.map(post => (post.id === editingPost.id ? {...post, ...newPost} : post))
                );
                setEditingPost(null);
           } else { //se eu não estiver editando o post -- fazer uma requisição p add novo post
            const response = await axios.post(API_URL, newPost);
            setPosts(prevPosts => [...prevPosts, response.data]);
           }
           setNewPosts({ title: '', body: ''});
        } catch (error) {
            console.error('Erro ao adicionar ou editar o post', error);
        }
    };

    //gerenciamento do estado -- useState
    const handleEditPost = (post: Post) => {
        setNewPosts({ title: post.title, body: post.body });
        setEditingPost(post);
    };

    //método para deletar o post
    const handleDeletePost = async (postId: number) => {
        try {
            await axios.delete(`${API_URL}/${postId}`);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Erro ao deletar o post', error);
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