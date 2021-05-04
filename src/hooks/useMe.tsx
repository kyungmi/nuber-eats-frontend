import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
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

export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
