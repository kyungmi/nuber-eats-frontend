import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { useMe } from '../../hooks/useMe';
import {
  EditProfile as EditProfileData,
  EditProfileVariables,
} from '../../__generated__/EditProfile';

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface FormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const client = useApolloClient();
  const { data: userData, refetch } = useMe();
  const onCompleted = async (data: EditProfileData) => {
    const { ok } = data.editProfile;
    if (ok && userData) {
      // update cache
      const { email: prevEmail } = userData.me;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        await refetch();
        // client.writeFragment({
        //   id: `User:${userData.me.id}`,
        //   fragment: gql`
        //     fragment EditedUser on User {
        //       email
        //       verified
        //     }
        //   `,
        //   data: {
        //     email: newEmail,
        //     verified: false,
        //   },
        // });
      }
    }
  };
  const [editProfile, { loading }] = useMutation<
    EditProfileData,
    EditProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<FormProps>({
    defaultValues: {
      email: userData?.me.email,
    },
    mode: 'onChange',
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }),
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h2 className="text-2xl mb-3 font-semibold">Edit Profile</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register('email', {
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          type="email"
          placeholder="Email"
          required
        />
        <input
          {...register('password')}
          className="input"
          type="password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          canClick={isValid && !loading}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
