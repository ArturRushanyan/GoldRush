// This function return updated and validated data for request body
const prepareUserData = (body, updated_data) => {
  body.name = updated_data.name;
  body.surname = updated_data.surname;
  body.user_type = updated_data.user_type;
  body.email = updated_data.email;
  body.password = updated_data.password;

  return body;
};

// This function prepare new user information to save in db
const prepareUserInstance = (data, hashedPassword) => {
  return {
    name: data.name,
    surname: data.surname,
    type: data.type,
    email: data.email,
    password: hashedPassword,
  };
};

module.exports = {
  prepareUserData,
  prepareUserInstance,
};
