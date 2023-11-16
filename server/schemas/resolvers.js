const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      return await User.findById(context.user._id);
    }
  },
  Mutation: {
    //create user may need addressing
    createUser: async (parent, { username, email }) => {
      const newUser = {
        id: String(User.length + 1),
        username,
        email,
      }

      User.push(newUser);

      return newUser;
    },


    signin: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token };
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
    }
  }
};

module.exports = resolvers;
