const { User } = require('../models');
const { Pet } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      return await User.findById(context.user._id).populate('pets');
    },
    pets: async () => {
      const allPets = await Pet.find();
      return allPets;
    }
  },
  Mutation: {
    //create user may need addressing
    createUser: async (parent, { firstName, lastName, email, password }) => {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password
      });
      const token = signToken(newUser);
      return { token, user: newUser };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.verifyPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token };
    },

    createPet: async (parent, { name, species, breed, ownerId, birthdate, image, weight, height, vaccinations }, context, info) => {
      const newPet = await Pet.create({
        name,
        species,
        breed,
        owner: ownerId, // ID of User
        birthdate,
        image,
        weight,
        height,
        vaccinations,
      });

      return { pet: newPet };
    },
    deletePet: async (parent, { petId }, context, info) => {
      const deletedPet = await Pet.findByIdAndDelete(petId);
  
      if (!deletedPet) {
        throw new Error("Pet not found");
      }
  
      return deletedPet;
    }
  }
};

module.exports = resolvers;
