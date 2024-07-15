// File path: src/components/LoginPage.tsx

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import Button from '../../components/button.tsx/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuthApi from '../../hooks/useAuthApi.hook';
import AuthApiService from '../../services/api-services';

interface LoginFormInputs {
    userName: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const auth = useAuthApi()
    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        const body = {
            userName: data.userName,
            password: data.password
        }
        await auth('auth/login', body, " Invalid Credentials ", "Logged Successfully", () => {
            navigate('/')
        });
    };
    const checkUser = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await AuthApiService.getApi('/auth/checkuser')
            if (res.statusCode === 200) {
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        checkUser()
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-white-100">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold">Login</h2>
                <div className="grid gap-4">
                    <InputBox
                        label="User Name"
                        name="userName"
                        type="text"
                        placeholder="Enter your user name"
                        required={true}
                        register={register}
                        error={errors}
                    />

                    <InputBox
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required={true}
                        register={register}
                        error={errors}
                    />
                </div>

                <Button
                    text="Login"
                    type="submit"
                    className="mt-4"
                    bg="primary"
                    textColor="white"
                    hoverColor="blue-700"
                />
                <p className="text-center text-sm text-gray-600">
                    Don't have an account? <Link to={'/register'}>Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
