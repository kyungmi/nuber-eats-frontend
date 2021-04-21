import { ApolloError, gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';

import nuberLogo from '../images/logo.svg';
import { Button } from '../components/button';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { UserRole } from '../__generated__/globalTypes';

import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from '../__generated__/CreateAccountMutation';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountMutation($createAccountInput: CreateAccountInput!) {
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

export const CreateAccount = (): JSX.Element => {
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

  const history = useHistory();

  const onCompleted = (data: CreateAccountMutation) => {
    const { ok, error } = data.createAccount;
    if (ok) {
      history.push('/login');
    }
  };
  const onError = (error: ApolloError) => {};

  const [
    createAccountMutation,
    { loading, error, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
      onError,
    }
  );

  const onSubmit = () => {
    if (loading) return;
    const { email = '', password = '', role } = getValues();
    createAccountMutation({
      variables: { createAccountInput: { email, password, role } },
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
            {...register('email', {
              required: 'Email is required',
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage={'Please enter a valid email'} />
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
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
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
