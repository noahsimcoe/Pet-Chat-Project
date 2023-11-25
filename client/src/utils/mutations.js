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
  mutation createPet($name: String!, $species: String, $breed: String, $birthdate: String, $image: String, $weight: Float, $height: Float, $vaccinations: Boolean) {
    createPet(name: $name, species: $species, breed: $breed, birthdate: $birthdate, image: $image, weight: $weight, height: $height, vaccinations: $vaccinations
    ) {
        _id
        name
        species
        breed
        owner {
          _id
        }
        birthdate
        image
        weight
        height
        vaccinations
      }
  }
`;

export const EDIT_PET = gql`
  mutation editPet(
    $petId: ID!
    $name: String
    $species: String
    $breed: String
    $birthdate: String
    $image: String
    $weight: Float
    $height: Float
    $vaccinations: Boolean
  ) {
    editPet(
      petId: $petId
      name: $name
      species: $species
      breed: $breed
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

export const DELETE_PET = gql`
  mutation deletePet($petId: ID!) {
    deletePet(petId: $petId) {
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
export const CREATE_REVIEW = gql`
  mutation createReview($userId: ID!, $service: String!, $rating: Float!, $comment: String) {
    createReview(userId: $userId, service: $service, rating: $rating, comment: $comment) {
      review {
        _id
        user {
          _id
          firstName
          lastName
        }
        service
        rating
        comment
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
mutation DeleteReview($reviewId: ID!) {
  deleteReview(reviewId: $reviewId) {
    _id
    user {
      _id
      firstName
    }
    service
    rating
    comment
  }
}
`;

export const CREATE_SERVICE = gql`
  mutation createService($serviceName: String!, $description: String!,) {
    createService(serviceName: $serviceName, description: $description,) {
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

export const DELETE_SERVICE = gql`
  mutation deleteService($serviceId: ID!, $userId: ID) {
    deleteService(serviceId: $serviceId, userId: $userId) {
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