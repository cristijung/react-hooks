
import { useState } from 'react';

type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
}

//inclui um array de objetos vazio
interface AppState {
    todos: TodoItem[];
}

//criando o estado atual do todo
//definindo o setState
const useAppState = () => {
    const [state, setState] = useState<AppState>({
        todos: [],
    });

    //criando a função para add um todo
    //este todo vem com o prevState e sua função p add
    const addTodo = (text: string) => {
        setState((prevState) => {
            return {
                todos: [
                    ...prevState.todos,
                    {
                        id: Date.now(),
                        text,
                        completed: false,
                    },
                ],
            };
        });
    };


    //criando a função para limpar o todo
    const clearTodos = () => {
        setState((prevState) => {
            return {
                todos: [],
            };
        });
    };
    //editar
    const editTodo = (id: number, newText: string) => {
        setState((prevState) => {
            return {
                todos: prevState.todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
                ),
            };
        });
    };

    //exibe a alteração de um estado de uma tarefa. A tarefa com id especificado
    const toggleTodo = (id: number) => {
        setState((prevState) => {
            return {
                todos: prevState.todos.map((todo) => 
                todo.id === id ? { ...todo, completed: !todo.completed} : todo
                ),
            };
        });
    };

    const deleteTodo = (id: number) => {
        setState((prevState) => {
            return {
                todos: prevState.todos.filter((todo) => todo.id !== id),
            };
        });
    };

    //retorno dos hooks personalizados
    return { state, addTodo, toggleTodo, clearTodos, editTodo, deleteTodo };
};
const TodoList = () => {
    const { state, addTodo, toggleTodo, clearTodos, editTodo, deleteTodo } = useAppState();
    const [newTodoText, setNewTodoText] = useState('');
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const[editedTodoText, setEditedTodoText] = useState('');

    return (
        <div>
          <h2>Todo List</h2>
          <ul>
            {state.todos.map((todo) => (
              <li key={todo.id}>
                <span
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {editingTodoId === todo.id ? (
                    <input
                      type="text"
                      value={editedTodoText}
                      onChange={(e) => setEditedTodoText(e.target.value)}
                    />
                  ) : (
                    todo.text
                  )}
                </span>
                <button onClick={() => setEditingTodoId(todo.id)}>
                  {editingTodoId === todo.id ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              placeholder="Add new todo..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
            <button
              onClick={() => {
                addTodo(newTodoText);
                setNewTodoText('');
              }}
            >
              Add Todo
            </button>
            <button onClick={clearTodos}>Clear All</button>
          </div>
        </div>
      );
    };
    
    const App = () => {
      return (
        <div className="App">
          <TodoList />
        </div>
      );
    };
    
    export default App;
    