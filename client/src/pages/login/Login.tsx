// File path: src/components/LoginPage.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import Button from '../../components/button.tsx/Button';

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = data => {
        console.log('Login Data:', data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white-100">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold">Login</h2>
                <div className="grid gap-4">
                    <InputBox
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
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
            </form>
        </div>
    );
};

export default LoginPage;
