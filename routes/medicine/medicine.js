// JavaScript Document
const express = require("express");
const router = express.Router();

//Get all medicines, authorization : all, return : All Cards
router.get("/", (req, res) => {
    console.log("in medicines get");
    res.json({ msg: "in medicines get" });
});

//Get my medicines, authorization : The Registered User, return : Array of users medicines
router.get("/my-medicines", (req,res) =>{
    console.log("in medicines get my medicines");
    res.json({ msg: "in medicines get my medicines" });
})

//Get medicine by id, authorization : all, Return : The medicine
router.get("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in medicines get params");
    res.json({ msg: "in medicines get params" });
});

//Create new medicine, authorization : Business User, Return : The new medicine
router.post("/", (req,res) => {
    console.log("in medicines post");
    res.json({msg: "in medicines post"});
});

//Edit medicine, authorization : User who created the medicine, Return : The edited medicine
router.put("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in medicines put");
    res.send("in medicines put");
    //res.json({msg: "in medicines put"});
})

//Like medicine, authorization : The User is registered, Return : The Liked medicine
router.patch("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in medicines patch");
    res.send("in medicines patch");
    //res.json({msg: "in medicines put"});
})

//Delete medicine, Authorization : The User who created the medicine, or admin, return : The Deleted medicine
router.delete("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in medicines delete");
    res.send("in medicines delete");
    //res.json({msg: "in medicines put"});
})


module.exports = router;