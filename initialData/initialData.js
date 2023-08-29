const usersService = require("../model/usersService/usersService");
const medicinesService = require("../model/medicinesService/medicinesService");
const hmosService = require("../model/hmosService/hmosService");
const pharmasService = require("../model/pharmasService/pharmaService");
const prescriptionService = require("../model/prescriptionsService/prescriptionService");
const hashService = require("../utils/hash/hashService");
const normalizeUserService = require("../model/usersService/helpers/normalizationUserService");
const normalizeMedicine = require("../model/medicinesService/helpers/normalizationMedicineService");
const normalizePharmaService = require("../model/pharmasService/helpers/normalizationPharmaService");
const normalizePrescription = require("../model/prescriptionsService/helpers/normalizationPrescriptionService");

const usersData = require("./users.json");
const medicinesData = require("./medicines.json");
const hmosData = require("./hmos.json");
const pharmasData = require("./pharmas.json");

const generatePrescription = async (medicine, patient, doctor, hmo) => {
  let prescription = {
    medicineList: [
      {medicineId: medicine.medicineNumber, medicineName: medicine.name, medicineUnits: 1, isActive: true},
      {medicineId: medicine.medicineNumber, medicineName: medicine.name, medicineUnits: 1, isActive: true},
      {medicineId: medicine.medicineNumber, medicineName: medicine.name, medicineUnits: 1, isActive: true}
    ],
    patientId: patient._id + "",
    doctorId: doctor._id + "" ,
    HMO: hmo._id + ""
  }

  return prescription;
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
    let hmoForCreation = "";
    for(let hmo of hmosData){
      let creationResult = await hmosService.createHMO(hmo);
      hmoForCreation = creationResult;
    }
    let pharma_id = "";
    for(let pharma of pharmasData){
      pharma.password = await hashService.generateHash(pharma.password);
      pharma = await normalizePharmaService.normalizationCreatePharmaService(pharma);
      let registerResult = await pharmasService.registerPharma(pharma);
      pharma_id = registerResult._id + "";
    }

    let registerResult, doctor, patient;
    for (let user of usersData) {
      user.password = await hashService.generateHash(user.password);
      user.HMO = hmoForCreation._id + "";
      user = normalizeUserService.normalizeCreatedUserService(user);
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

    let prescription = await generatePrescription(medicineCreationResult, patient, doctor, hmoForCreation);
    prescription = await normalizePrescription(prescription, patient);
    let prescriptionCreationResult = await prescriptionService.createPrescription(prescription);

  } catch (err) {
    console.log("err from initial", err);
  }
};

module.exports = initialData;
