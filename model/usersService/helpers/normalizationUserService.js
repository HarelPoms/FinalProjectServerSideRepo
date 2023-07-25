const config = require("config");
const normalizationUserMongo = require("../../mongodb/users/helpers/normalizationUser");
const dbOption = config.get("dbOption");

const normalizeCreatedUserService = (userData) => {
  if (dbOption === "mongo") {
    return normalizationUserMongo.normalizeCreatedUser(userData);
  }
};

const normalizeEditedUserService = (userData) => {
  if (dbOption === "mongo") {
    return normalizationUserMongo.normalizeEditedUser(userData);
  }
};

module.exports = {normalizeCreatedUserService, normalizeEditedUserService};
