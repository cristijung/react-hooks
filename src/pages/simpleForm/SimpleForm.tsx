
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
    username: string;
}

const SimpleForm: React.FC = () => {
    const validationSchema = yup.object().shape({
        username: yup.string().required('Nome de usuário obrigatório'),
    });

    const { register, handleSubmit, formState: { errors} } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Nome do user', data.username);
        alert(`Olá, ${data.username}!`);
    };

    return(
        <>
        <h2>Hook Form com Yup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>
                <label>Nome do Usuário:</label>                
            </p>
            <div>
                <input type='text' {...register('username')}/>
                {errors.username && <p>{errors.username.message}</p>}
            </div>
            <button type='submit'>Enviar</button>
        </form>
        </>
    )
}


export default SimpleForm;