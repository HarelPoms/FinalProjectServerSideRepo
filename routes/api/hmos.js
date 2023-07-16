const express = require("express");
const router = express.Router();

//Get all HMOs, authorization : all, return : All HMOs
router.get("/", (req, res) => {
    console.log("in HMOs get");
    res.json({ msg: "in HMOs get" });
});

//Get HMO by id, authorization : all, Return : The HMO
router.get("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in HMOs get params");
    res.json({ msg: "in HMOs get params" });
});

//Create new HMO, authorization : Admin User, Return : The new HMO
router.post("/", (req,res) => {
    console.log("in HMOs post");
    res.json({msg: "in HMOs post"});
});

//Edit HMO, authorization : User who created the HMO, Return : The edited HMO
router.put("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in HMOs put");
    res.send("in HMOs put");
    //res.json({msg: "in medicines put"});
})

//Delete HMO, Authorization : Admin, return : The Deleted HMO
router.delete("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in HMOs delete");
    res.send("in HMOs delete");
    //res.json({msg: "in medicines put"});
})

module.exports = router;