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
  }
`;

module.exports = typeDefs;
