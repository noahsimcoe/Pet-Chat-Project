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
        owner {
          lastName
        }
        birthdate
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
      breed
    }
  }
`;

export const QUERY_ALL_USERS = gql`
{
  users {
    _id
    firstName
    lastName
    email
    pets {
      _id
      name
      species
      breed
      owner {
        lastName
      }
      birthdate
      image
      weight
      height
      vaccinations
    }
  }
}
`;