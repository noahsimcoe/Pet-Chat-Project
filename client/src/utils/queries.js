import { gql } from "@apollo/client";

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
        birthdate
        image
        weight
        height
        vaccinations
      }
      services {
        _id
        name
        description
        reviews {
          _id
          comment
        }
      }
      reviews {
        _id
        comment
        service {
          _id
          name
        }
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

export const QUERY_SERVICE = gql`
  {
    services {
      _id
      name
      description
      provider {
        _id
        firstName
      }
      reviews {
        _id
        comment
        user {
          _id
          firstName
        }
      }
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
