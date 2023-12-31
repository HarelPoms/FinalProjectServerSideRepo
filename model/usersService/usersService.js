const config = require("config");
const usersServiceMongo = require("../mongoDB/users/usersServiceMdb");
const dbOption = config.get("dbOption");

const registerUser = (userData) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.registerUser(userData);
  }
};

const getUserByEmail = (email) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserByEmail(email);
  }
};

const getAllUsers = () => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getAllUsers();
  }
};

const getUserById = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserById(id);
  }
};

const getUserFullNameById = (id) => {
  if (dbOption === "mongo"){
    return usersServiceMongo.getUserFullNameOnly(id);
  }
}

const getUsersWithSpecificHMO = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getAllUsersWithSpecificHMO(id);
  }
}

const updateUser = (id, userToUpdate) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.updateUser(id, userToUpdate);
  }
};

const changeDoctorStatusById = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.changeDoctorStatusById(id);
  }
};

const deleteUserById = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.deleteUserById(id);
  }
};

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  getUserFullNameById,
  getUsersWithSpecificHMO,
  updateUser,
  changeDoctorStatusById,
  deleteUserById
};
