const { User, Pet, Review, Service} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      return await User.findById(context.user._id).populate("pets").populate("services").populate("reviews");
    },
    pets: async () => {
      try {
        const allPets = await Pet.find().populate("owner");
        return allPets;
      } catch (error) {
        console.error(error);
        throw new Error('failed to fetch pets.');
      }
    },
    services: async () => {
      return Service.find()
    },

    users: async () => {
      const allUsers = await User.find();
      return allUsers;
    }
  },
  Mutation: {
    createUser: async (parent, { firstName, lastName, email, password }) => {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
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

    createPet: async (parent, { name, species, breed, owner, birthdate, image, weight, height, vaccinations }, context) => {
      const newPet = await Pet.create({
        name,
        species,
        breed,
        owner: context.user._id,
        birthdate,
        image,
        weight,
        height,
        vaccinations,
      });
      const user = await User.findOneAndUpdate({_id: context.user._id}, {$push: {pets: newPet._id}}, {new: true})
      return newPet;
    },

    editPet: async (
      parent,
      {
        petID,
        name,
        species,
        breed,
        ownerId,
        birthdate,
        image,
        weight,
        height,
        vaccinations,
      },
      context,
      info
    ) => {
      const existingPet = await Pet.findById(petId);

      if (!existingPet) {
        throw new Error("Sorry, pet not found.");
      }

      existingPet.name = name || existingPet.name;
      existingPet.species = species || existingPet.species;
      existingPet.breed = breed || existingPet.breed;
      existingPet.birthdate = birthdate || existingPet.birthdate;
      existingPet.image = image || existingPet.image;
      existingPet.weight = weight || existingPet.weight;
      existingPet.height = height || existingPet.height;
      existingPet.vaccinations = vaccinations || existingPet.vaccinations;

      await existingPet.save();

      return { pet: existingPet };
    },

    deletePet: async (parent, { petId, userId }, context, info) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const pet = await Pet.findById(petId);

      if (!pet) {
        throw new Error("Pet not found");
      }

      if (pet.owner.toString() !== userId) {
        throw new Error("User is not authorized to delete this pet");
      }

      const deletedPet = await Pet.findByIdAndDelete(petId);

      if (!deletedPet) {
        throw new Error("Pet not found");
      }

      return deletedPet;
    },

    createReview: async (
      parent,
      { service, comment },
      context,
    ) => {
      const newReview = await Review.create({
        user: userId,
        service,
        comment,
      });

      await Service.findByIdAndUpdate(context.user._id, { $push: { reviews: newReview._id } });

      return { review: newReview };
    },
    deleteReview: async (parent, { reviewId, userId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const review = await Review.findById(reviewId);

      if (!review) {
        throw new Error("Review not found");
      }

      if (review.user.toString() !== userId) {
        throw new Error("User is not authorized to delete this review");
      }

      const deletedReview = await Review.findByIdAndDelete(reviewId);

      if (!deletedReview) {
        throw new Error("Review not found");
      }

      return deletedReview;
    },

    createService: async (parent, { serviceName, description, userId }, context) => {
      try {
      const newService = await Service.create({
        name: serviceName,
        description,
        provider: context.user._id,
      });

      console.log('service created successfully', newService)

      await User.findByIdAndUpdate(context.user._id, { $push: { services: newService._id } });
      return { Service: newService };
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    } 
  },

    deleteService: async (parent, { serviceId, userId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      const service = await Service.findById(serviceId);

      if (!service) {
        throw new Error("Service not found");
      }


      const deletedService = await Service.findByIdAndDelete(serviceId);

      if (!deletedService) {
        throw new Error("Service not found");
      }

      return deletedService;
    },
  },
};

module.exports = resolvers;
