// JavaScript Document
const express = require("express");
const router = express.Router();

//Get all pharmas, authorization : all, return : All Pharmas
router.get("/", (req, res) => {
    console.log("in pharmas get");
    res.json({ msg: "in pharmas get" });
});

//Get pharma by id, authorization : all, Return : The pharma
router.get("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in pharmas get params");
    res.json({ msg: "in pharmas get params" });
});

//Create new pharma, authorization : Admin User, Return : The new pharma
router.post("/", (req,res) => {
    console.log("in pharmas post");
    res.json({msg: "in pharmas post"});
});

//Edit pharma, authorization : User who created the pharma, Return : The edited pharma
router.put("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in pharmas put");
    res.send("in pharmas put");
    //res.json({msg: "in medicines put"});
})

//Delete pharma, Authorization : Admin, return : The Deleted pharma
router.delete("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in pharmas delete");
    res.send("in pharmas delete");
    //res.json({msg: "in medicines put"});
})

module.exports = router;