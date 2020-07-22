const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { validateUserInput, validateLogInInput} = require("../../utilities/validators");
const { SECRET_KEY } = require("../../config");

const User = require("../../models/User");

function generateToken(user){
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        SECRET_KEY, 
        // The Secret Key is so that only our server can decode the token
        { expiresIn: "1h" }
      );
}

// Exports Below
module.exports = {
  Mutation: {

    // Here is where we: Validate user info, make sure user doesn't exist, create hash pwd and an auth token
    // For: Existing User
    async login(_, {username, password}){

        const { valid, errors } = validateLogInInput(
            username,
            password,
          );

        if(!valid){
            throw new UserInputError("Errors", {errors})
        }
          
        const user = await User.findOne({username})

        if(!user){
            errors.general = "User not found"
            throw new UserInputError("User not found", {errors})
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            errors.general = "Wrong Credentials"
            throw new UserInputError("Wrong Credentials", {errors})
        }
        
        const token = generateToken(user)

        return {
            ...user._doc, // Where our doc is stored
            id: user._id,
            token,
          };
    },

    // Here is where we: Validate user info, make sure user doesn't exist, create hash pwd and an auth token
    // For: New User
    async register(
      _,
      { registerInput: { name, username, email, password, confirmPassword } }
    ) {


      // Adds Validators to check if fields aren't empy, email patterns, etc
      const { valid, errors } = validateUserInput(
        name,
        username,
        email,
        password,
        confirmPassword
      );
      
      if(!valid){
          throw new UserInputError('Errors', {errors})
      }

      // Makes Sure User/Email doesn't exist
      const user = await User.findOne({ username });
      const emailCheck = await User.findOne({ email });
      const nameCheck = await User.findOne({ name });

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      } else if (emailCheck) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This email is taken",
          },
        });
      } else if (nameCheck) {
        throw new UserInputError("Name is taken", {
          errors: {
            email: "This name is taken",
          },
        });
      }

      // Creates hash pwd of 12 digits
      password = await bcrypt.hash(password, 12);

      // uses the User model to create a new user from the RegisterInput
      const newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password,
        createdAt: new Date().toISOString(),
      });

      // saves to db
      const res = await newUser.save();

      // uses jsonwebtoken to generate a token to give to the user
      const token = generateToken(res) 

      return {
        ...res._doc, // Where our doc is stored
        id: res._id,
        token,
      };
    },
  },
};

// Notes: on register() above
// on register(parent, args, context, info), parent is used when there are multiple resolvers.
// There's no step yet before our mutation so we are not using it
// Most of the time we'll use args, in our case these are the RegisterInput input
// Info is some metadata stuff
// Both context and info arguments where deleted because they are optional