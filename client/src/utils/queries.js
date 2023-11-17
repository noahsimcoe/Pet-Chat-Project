import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_PETS = gql`
  {
    pets {
      _id
      name
      species
      // ... other fields
    }
  }
`;
