import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { MeQuery } from '../__generated__/MeQuery';

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter: FC = () => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

  if (loading || error || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  const onLogout = () => {
    isLoggedInVar(false);
    authTokenVar(null);
  };

  return (
    <div>
      <h1>{data.me.email}</h1>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
};
