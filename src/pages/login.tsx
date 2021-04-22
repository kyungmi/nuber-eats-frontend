import { ApolloError, gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  LoginMutation,
  LoginMutationVariables,
} from '../__generated__/LoginMutation';
import nuberLogo from '../images/logo.svg';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { authToken, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({ mode: 'onChange' });

  const onCompleted = (data: LoginMutation) => {
    const { ok, token, error } = data.login;
    if (ok && token) {
      console.log(token);
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };
  const onError = (error: ApolloError) => {};

  const [
    loginMutation,
    { loading, error, data: loginMutationResult },
  ] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted,
    onError,
  });

  const onSubmit = () => {
    if (loading) return;
    const { email = '', password = '' } = getValues();
    loginMutation({
      variables: { loginInput: { email, password } },
    });
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-16" />
        <h4 className="w-full font-medium text-left text-3xl mb-8">
          Welcome back
        </h4>
        <p className="w-full font-normal text-left text-sm">
          Sign in with your email address or mobile number.
        </p>
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
          <Button
            actionText="Log In"
            canClick={isValid}
            loading={loading}
            className="mt-3"
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{' '}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
