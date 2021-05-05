import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useMe } from '../../hooks/useMe';
import {
  VerifyEmail,
  VerifyEmailVariables,
} from '../../__generated__/VerifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { data: userData } = useMe();
  const onCompleted = (data: VerifyEmail) => {
    const { ok } = data.verifyEmail;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push('/');
    }
  };
  const [verifyEmail] = useMutation<VerifyEmail, VerifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    verifyEmail({
      variables: {
        input: {
          code: code ?? '',
        },
      },
    });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
