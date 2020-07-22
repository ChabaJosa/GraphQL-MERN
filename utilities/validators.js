module.exports.validateUserInput = (
  name,
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (name.trim() === "") {
    errors.name = "Name must not be empty";
  }

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim === "") {
    errors.email = "Email must not be empty";
  } else {
    // Checks for email pattern
    if (!email.includes("@") || !email.includes(".")) {
      errors.email = "Must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1, // If the lenght is less than one that means there's no errors
  };
};

module.exports.validateLogInInput = (username, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1, // If the lenght is less than one that means there's no errors
  };
};
