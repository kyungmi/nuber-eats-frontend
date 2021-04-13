import React from 'react';
import { useForm } from 'react-hook-form';

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800 m-0">Log In</h3>
        <form
          className="grid gap-3 my-5 px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500 text-left">
              {errors.email.message}
            </span>
          )}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: 10,
            })}
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <span className="text-left ont-medium text-red-500">
              {errors.password.message}
            </span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className="font-medium text-red-500 text-left">
              Password must be more than 10 chars.
            </span>
          )}
          <button className="btn">Log In</button>
        </form>
      </div>
    </div>
  );
};
