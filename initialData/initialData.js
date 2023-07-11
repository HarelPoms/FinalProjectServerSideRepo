const usersService = require("../model/usersService/usersService");
const medicinesService = require("../model/medicinesService/medicinesService");
const hashService = require("../utils/hash/hashService");
const normalizeUser = require("../model/usersService/helpers/normalizationUserService");
const normalizeMedicine = require("../model/medicinesService/helpers/normalizationMedicineService");

const usersData = require("./users.json");
const medicinesData = require("./medicines.json");

const initialData = async () => {
  try {
    let medicines = await medicinesService.getAllMedicines();
    if (medicines.length) {
      return;
    }
    let users = await usersService.getAllUsers();
    if (users.length) {
      return;
    }
    let user_id = "";
    let registerResult;
    for (let user of usersData) {
      user.password = await hashService.generateHash(user.password);
      user = normalizeUser(user);
      registerResult = await usersService.registerUser(user);
      if(registerResult.isBusiness){
        user_id = registerResult;
      }
    }
    pharma_id = user_id._id + "";
    for (let medicine of medicinesData) {
      medicine = await normalizeMedicine(medicine, pharma_id);
      await medicinesService.createMedicine(medicine);
    }
  } catch (err) {
    console.log("err from initial", err);
  }
};

module.exports = initialData;
