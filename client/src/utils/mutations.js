import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        firstName
        lastName
        email
      }
    }
  }
`;


export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation signin(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signin(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const CREATE_PET = gql`
  mutation createPet(
    $name: String!
    $species: String
    $breed: String
    $ownerId: ID!
    $birthdate: String
    $image: String
    $weight: Float
    $height: Float
    $vaccinations: Boolean
  ) {
    createPet(
      name: $name
      species: $species
      breed: $breed
      ownerId: $ownerId
      birthdate: $birthdate
      image: $image
      weight: $weight
      height: $height
      vaccinations: $vaccinations
    ) {
        _id
        name
        species
        breed
        owner {
          _id
          firstName
        }
        birthdate
        image
        weight
        height
        vaccinations
      }
  }
`;


