const usersService = require("../model/usersService/usersService");
const medicinesService = require("../model/medicinesService/medicinesService");
const hmosService = require("../model/hmosService/hmosService");
const pharmasService = require("../model/pharmasService/pharmaService");
const hashService = require("../utils/hash/hashService");
const normalizeUser = require("../model/usersService/helpers/normalizationUserService");
const normalizeMedicine = require("../model/medicinesService/helpers/normalizationMedicineService");
const normalizePharma = require("../model/pharmasService/helpers/normalizationPharmaService");

const usersData = require("./users.json");
const medicinesData = require("./medicines.json");
const hmosData = require("./hmos.json");
const pharmasData = require("./pharmas.json");

const initialData = async () => {
  try {
    let hmos = await hmosService.getAllHMOs();
    if(hmos.length){
      return;
    }
    let medicines = await medicinesService.getAllMedicines();
    if (medicines.length) {
      return;
    }
    let users = await usersService.getAllUsers();
    if (users.length) {
      return;
    }
    let hmo_id = "";
    for(let hmo of hmosData){
      let creationResult = await hmosService.createHMO(hmo);
      hmo_id = creationResult;
    }
    let pharma_id = "";
    for(let pharma of pharmasData){
      pharma = await normalizePharma(pharma);
      let registerResult = await pharmasService.registerPharma(pharma);
      pharma_id = registerResult._id + "";
    }

    let registerResult;
    for (let user of usersData) {
      user.password = await hashService.generateHash(user.password);
      user.hmo = hmo_id._id + "";
      user = normalizeUser(user);
      registerResult = await usersService.registerUser(user);
      if(registerResult.isBusiness){
        user_id = registerResult;
      }
    }

    for (let medicine of medicinesData) {
      medicine = await normalizeMedicine(medicine, pharma_id);
      await medicinesService.createMedicine(medicine);
    }
  } catch (err) {
    console.log("err from initial", err);
  }
};

module.exports = initialData;
