import { ServerError } from '../middlewares/errorHandler.js';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
};

// TODO: Make password validator for later

export const validateNewUserEntry = (body) => {
  let { name, email, password } = body;

  name = name.toString();
  email = email.toString();
  password = password.toString();

  //Check if the fields are empty
  if (!name || !email || !password) {
    throw new ServerError('Missing required information', 400);
  }

  //Check if the email is valid
  if (validateEmail(email)) {
    throw new ServerError('Invalid email', 400);
  }

  //Check if the name have more than 32 characters
  if (name.length > 32) {
    throw new ServerError('Name is too long', 400);
  }

  return {
    name,
    email,
    password,
  };
};

export const validateLoginEntry = (body) => {
  let { email, password } = body;

  email = email.toString();
  password = password.toString();

  //Check if the email is valid
  if (validateEmail(email)) {
    throw new ServerError('Invalid email', 400);
  }

  return { email, password };
};

