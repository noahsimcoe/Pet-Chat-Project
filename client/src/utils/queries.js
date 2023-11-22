import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      pets {
        _id
        name
        species
        breed
        owner
        birthday
        image
        weight
        height
        vaccinations
      }
    }
  }
`;

export const QUERY_PETS = gql`
  {
    pets {
      _id
      name
      species
    }
  }
`;

export const QUERY_SERVICE =gql`
{
  Service {
    _id
    name
    description
    provider {
      _id
      firstName
    }
  }
}
`;