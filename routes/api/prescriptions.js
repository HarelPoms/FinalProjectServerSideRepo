// JavaScript Document
const express = require("express");
const router = express.Router();

//Get all prescriptions, authorization : all, return : All Prescriptions
router.get("/", (req, res) => {
    console.log("in pharmas get");
    res.json({ msg: "in pharmas get" });
});

//Get my prescriptions, authorization : Patient/Doctor, return : Array of users prescriptions
router.get("/my-prescriptions", (req,res) =>{
    console.log("in prescriptions get my prescriptions");
    res.json({ msg: "in prescriptions get my prescriptions" });
})

//Get prescription by id, authorization : all, Return : The prescription
router.get("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in prescriptions get params");
    res.json({ msg: "in prescriptions get params" });
});

//Create new prescription (request), authorization : Patient, Doctor, Return : The new prescription
router.post("/", (req,res) => {
    console.log("in prescriptions post");
    res.json({msg: "in prescriptions post"});
});

//Edit prescription, authorization : Doctor who is in charge of it, Return : The edited prescription
router.put("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in prescriptions put");
    res.send("in prescriptions put");
    //res.json({msg: "in medicines put"});
})

//Delete prescription, Authorization : Admin, Doctor, return : The Deleted prescription
router.delete("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in prescriptions delete");
    res.send("in prescriptions delete");
    //res.json({msg: "in medicines put"});
})

module.exports = router;