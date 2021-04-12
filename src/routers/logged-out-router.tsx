import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter: FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch('email'));
  };
  const onInvalid = (invalid: any) => {
    console.log(errors);
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            type="email"
            placeholder="email"
            {...register('email', {
              required: 'This is required',
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
          />
          {errors.email?.message && (
            <span className="font-bold text-red-600">
              {errors.email.message}
            </span>
          )}
          {errors.email?.type === 'pattern' && (
            <span className="font-bold text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            {...register('password', { required: true })}
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
