const { User, Pet, Review } = require('../models');
const { Pet } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      return await User.findById(context.user._id);
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
    },
    createReview: async (parent, { userId, service, rating, comment }, context, info) => {
      const newReview = await Review.create({
        user: userId, 
        service,
        rating,
        comment,
      });
    
      return { review: newReview };
    },
    deleteReview: async (parent, { reviewId }, context, info) => {
      
      const deletedReview = await Review.findByIdAndDelete(reviewId);
    
      if (!deletedReview) {
        throw new Error("Review not found");
      }
    
      return deletedReview;
    },
  }
};




module.exports = resolvers;
