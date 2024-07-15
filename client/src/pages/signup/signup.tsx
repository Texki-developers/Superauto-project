import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputBox from '../../components/formComponents/inputBox/InputBox';
import Button from '../../components/button.tsx/Button';
import useAuthApi from '../../hooks/useAuthApi.hook';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormInputs {
    email: string;
    password: string;
    userName: string;
    confirmPassword: string;
}

const SignupPage: React.FC = () => {
    const { register, handleSubmit, setError, watch, formState: { errors } } = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");


    const auth = useAuthApi()
    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        if (confirmPassword && password !== confirmPassword) {
            setError('confirmPassword', { type: 'validate', 'message': 'Passwords do not match' });
            return
        }
        const body = {
            email: data.email,
            userName: data.userName,
            password: data.password
        }
        await auth('auth/register', body, "Account Creation Failed", "Account Created Successfully", () => {
            navigate('/login')
        });
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-white-100">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold">Register</h2>
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
                        label="User Name"
                        name="userName"
                        type="text"
                        placeholder="Enter your User Name"
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
                    <InputBox
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        required={true}
                        register={register}
                        error={errors}
                    />
                </div>

                <Button
                    text="Register"
                    type="submit"
                    className="mt-4"
                    bg="primary"
                    textColor="white"
                    hoverColor="blue-700"
                />
                <p className="text-center text-sm text-gray-600">
                    Already have an account? <Link to={'/login'}>Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
