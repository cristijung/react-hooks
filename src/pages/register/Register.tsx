//O código importa as funções useForm e SubmitHandler do pacote react-hook-form. Essas funções são usadas para gerenciar o estado e o comportamento do formulário.
//Também importa o axios para realizar chamadas HTTP, e o tipo AxiosResponse para tipar a resposta da requisição.

import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosResponse } from 'axios';

interface UserRegistrationResponse {
  id: number;
  error?: string;
}

interface UserFormData {
  username: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>();
  
  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      const response: AxiosResponse<UserRegistrationResponse> = await axios.post('http://localhost:3001/users', data);
      console.log('User registered with ID:', response.data.id);
      alert('User cadastrado');
      // Limpar os dados do formulário após o registro
      reset();
    } catch (error) {
      console.error('User não cadastrado');
    }
  };

//define a função onSubmit, que é chamada quando o formulário é enviado.
//usa axios.post para enviar os dados do formulário para a API.
//exibe mensagens no console e alertas com base na resposta da API.
//limpa os dados do formulário após o registro bem-sucedido.

  return (
    <div>
      <h2>Cadastrar usuário</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome do usuário:</label>
          <input type="text" {...register('username', { required: true })} />
          {errors.username && <span>Este campo é obrigatório</span>}
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" {...register('password', { required: true })} />
          {errors.password && <span>Este campo é obrigatório</span>}
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;