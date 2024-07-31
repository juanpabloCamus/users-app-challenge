import { ServerError } from '../middlewares/errorHandler.js';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
};

// I did not a password validator due testing purposes

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

export const validateUpdateUserEntry = (body) => {
  let { name, email } = body;

  name = name.toString();
  email = email.toString();

  if (name.length > 32) {
    throw new ServerError('Name is too long', 400);
  }

  //Check if the email is valid
  if (validateEmail(email)) {
    throw new ServerError('Invalid email', 400);
  }
  
  return { name, email };
};