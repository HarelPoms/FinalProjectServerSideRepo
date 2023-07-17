const usersService = require("../model/usersService/usersService");
const medicinesService = require("../model/medicinesService/medicinesService");
const hmosService = require("../model/hmosService/hmosService");
const pharmasService = require("../model/pharmasService/pharmaService");
const perscriptionService = require("../model/prescriptionsService/prescriptionService");
const hashService = require("../utils/hash/hashService");
const normalizeUser = require("../model/usersService/helpers/normalizationUserService");
const normalizeMedicine = require("../model/medicinesService/helpers/normalizationMedicineService");
const normalizePharma = require("../model/pharmasService/helpers/normalizationPharmaService");
const normalizePerscription = require("../model/prescriptionsService/helpers/normalizationPerscriptionService");

const usersData = require("./users.json");
const medicinesData = require("./medicines.json");
const hmosData = require("./hmos.json");
const pharmasData = require("./pharmas.json");

const generatePerscription = async (medicine, patient, doctor, hmo) => {
  let perscription = {
    medicineList: [
      {medicineId: medicine._id, medicineName: medicine.name, medicineUnits: 1, isActive: true},
      {medicineId: medicine._id, medicineName: medicine.name, medicineUnits: 1, isActive: true},
      {medicineId: medicine._id, medicineName: medicine.name, medicineUnits: 1, isActive: true}
    ],
    patientId: patient._id,
    patientName: patient.Name.first + patient.Name.last,
    doctorId: doctor._id,
    doctorName: doctor.Name.first + doctor.Name.last,
    HMO: hmo.name
  }

  return perscription;
}

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

    let registerResult, doctor, patient;
    for (let user of usersData) {
      user.password = await hashService.generateHash(user.password);
      user.hmo = hmo_id._id + "";
      user = normalizeUser(user);
      registerResult = await usersService.registerUser(user);
      if(registerResult.isDoctor){
        doctor = registerResult;
      }
      if(!registerResult.isDoctor && !registerResult.isAdmin){
        patient = registerResult;
      }
    }

    let medicineCreationResult;
    for (let medicine of medicinesData) {
      medicine = await normalizeMedicine(medicine, pharma_id);
      medicineCreationResult = await medicinesService.createMedicine(medicine);
    }

    let perscription = await generatePerscription(medicineCreationResult, patient, doctor, hmo_id);
    perscription = await normalizePerscription(perscription, patient);
    let perscriptionCreationResult = await perscriptionService.createPrescrption(perscription);

  } catch (err) {
    console.log("err from initial", err);
  }
};

module.exports = initialData;
