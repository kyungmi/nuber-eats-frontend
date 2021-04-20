import { ApolloError, gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';

import nuberLogo from '../images/logo.svg';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { UserRole } from '../__generated__/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email?: string;
  password?: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const onCompleted = (data: any) => {
    const { ok, token, error } = data.createAccount;
    if (ok) {
      console.log(token);
    }
  };
  const onError = (error: ApolloError) => {};

  const [
    createAccountMutation,
    { loading, error, data: loginMutationResult },
  ] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
    onError,
  });

  const onSubmit = () => {
    if (loading) return;
    const { email = '', password = '' } = getValues();
    createAccountMutation({
      variables: { createAccountInput: { email, password } },
    });
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-16" />
        <h4 className="w-full font-medium text-left text-3xl mb-8">
          Let's get started
        </h4>
        <form
          className="grid gap-3 my-2 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: 5,
            })}
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 5 chars." />
          )}
          <div className="input">
            <select
              {...register('role', { required: true })}
              className="w-full focus:outline-none"
            >
              {Object.keys(UserRole).map((role) => (
                <option key={`user-role-${role}`} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <Button
            actionText="Create Account"
            canClick={isValid}
            loading={loading}
            className="mt-3"
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          Already have an account?{' '}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
