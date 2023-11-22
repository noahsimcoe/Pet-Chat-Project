const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    pets: [Pet]
    reviews: [Review]
    services: [Service]
  }

  type Pet {
    _id: ID
    name: String
    species: String
    breed: String
    owner: User
    birthdate: String
    image: String
    weight: Float
    height: Float
    vaccinations: Boolean
  }

  input EditPetInput {
    petId: ID!
    name: String
    species: String
    breed: String
    birthdate: String
    image: String
    weight: Float
    height: Float
    vaccinations: [String]
  }
  
  type EditPetResponse {
    pet: Pet
  }

  type Review {
    _id: ID
    user: User
    service: Service
    rating: Int
    comment: String
  }

  type Service {
    _id: ID
    name: String
    description: String
    provider: User
    reviews: [Review]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    pets: Pet
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    signin(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPet(name: String!, species: String, breed: String, ownerId: ID!, birthdate: String, image: String, weight: Float, height: Float, vaccinations: Boolean): Pet
    editPet(input: EditPetInput!): EditPetResponse
    deletePet(petId: ID!, userId: ID!): Pet
    createReview(userId: ID!, service: String!, rating: Int!, comment: String): Review
    deleteReview(reviewId: ID!, userId: ID!): Review
    createService(serviceId: ID, userId: ID!, serviceName: String!, description: String!): Service
    deleteService(serviceId: ID!, userId: ID!): Service
  }
`;

module.exports = typeDefs;
