const User = require("./Users");

const registerUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getAllUsers = () => {
  return User.find();
};

const getAllUsersWithSpecificHMO = (id) => {
  return User.find({HMO: id});
}

const getUserById = (id) => {
  return User.findById(id);
}

const updateUser = (id, userToUpdate) => {
  return User.findByIdAndUpdate(id, userToUpdate, {new: true});
};

const changeDoctorStatusById = (id) => {
  return User.findByIdAndUpdate(id, [{ $set: { isDoctor: { $not: "$isDoctor" } } }], {new:true});
}

const deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
}


module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getAllUsersWithSpecificHMO,
  getUserById,
  updateUser,
  changeDoctorStatusById,
  deleteUserById
};
