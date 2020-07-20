module.exports.validateUserInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim === "") {
    errors.email = "Email must not be empty";
  } else {
    // Checks for email pattern
    if (!email.includes("@")) {
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

