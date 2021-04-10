import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';

export const LoggedOutRouter: FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
              pattern: /^[A-Za-z0-9._%+-]+@gamil.com$/,
            })}
          />
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
