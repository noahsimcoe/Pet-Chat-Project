const { User, Pet, Review, service} = require('../models');
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
    
    createService: async (parent, { serviceName, description, userId }, context, info) => {
      const newService = await Service.create({
        name: serviceName,
        description,
        provider: userId,
      });

      return { service: newService };
    },

    deleteService: async (parent, { serviceId, userId }, context, info) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const service = await Service.findById(serviceId);

      if (!service) {
        throw new Error("Service not found");
      }

      if (service.provider.toString() !== userId) {
        throw new Error("User is not authorized to delete this service");
      }

      const deletedService = await Service.findByIdAndDelete(serviceId);

      if (!deletedService) {
        throw new Error("Service not found");
      }

      return deletedService;
    },
  }
};
  

module.exports = resolvers;
