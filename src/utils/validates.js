const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateSignUp = (data) => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email adress";
  }
  if (isEmpty(data.password)) {
    errors.password = "Must not be empty";
  }
  if (isEmpty(data.userName)) {
    errors.userName = "Must not be empty";
  }
  if (data.userName.length > 20) {
    errors.userName = "User name must be less than 20 charecters";
  }
  if (data.password.length < 6) {
    errors.password = "Password must be more than 6 characters";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
exports.validateLogin = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  }

  if (isEmpty(data.password)) {
    errors.password = "Must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
exports.validatePost = (data) => {
  let errors = {};

  if (isEmpty(data.title)) {
    errors.title = "Must not be empty";
  }
  if (isEmpty(data.description)) {
    errors.description = "Must not be empty";
  }
  if (isEmpty(data.startDate)) {
    errors.startDate = "Must not be empty";
  }
  if (typeof data.longitude === "string") {
    if (isEmpty(data.longitude)) {
      errors.longitude = "Must not be empty";
    }
  }
  if (typeof data.latitude === "string") {
    if (isEmpty(data.latitude)) {
      errors.latitude = "Must not be empty";
    }
  }

  if (isEmpty(data.endDate)) {
    errors.endDate = "Must not be empty";
  }

  if (isEmpty(data.rating)) {
    errors.rating = "Must not be empty";
  }

  if (data.longitude > 180) {
    errors.longitude =
      "Maximum value of longitude is 180,please enter valid number.";
  }
  if (data.latitude > 90) {
    errors.latitude =
      "Maximum value of longitude is 90,please enter valid number.";
  }
  if (isNaN(data.latitude)) {
    errors.latitude = "Please enter a valid number.";
  }
  if (isNaN(data.longitude)) {
    errors.longitude = "Please enter a valid number.";
  }
  if (data.rating < 0 || data.rating > 5) {
    errors.rating = "Rating scale is 0-5.";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
