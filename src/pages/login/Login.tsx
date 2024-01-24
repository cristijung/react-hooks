import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  username: string;
  password: string;
}

//troquei aqui!!
//coloquei o (sugertido pelo GPT) ===> yup.string().oneOf() para aceitar somente strings ou números. 
//É mais uma boa prática tratar a validação do formulário no back e no front
const schema = yup.object().shape({
  username: yup.string().required('Nome do usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória').oneOf(['string', 'number'], 'A senha deve ter caracteres e números'),
});

const Logins = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?username=${data.username}&password=${data.password}`
      );
      if (response.data.length > 0) {
        console.log('Login com sucesso:', response.data[0].id);
      } else {
        console.error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Login falhou:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome do usuário:</label>
          <input
            type="text"
            {...register('username')}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Logins;
