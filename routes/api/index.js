// creating all end points here in one file just because this is a task
// project in real project every entity will be in separate folder
const express = require("express");
const router = express.Router();

const Employee = require("../../models/employee");
const EmployeeSlot = require("../../models/employeeSlot");
const CheckupVenue = require("../../models/checkupVenue");

// Endpoint: /api/addVenue
// Task: Add New venue
router.post("/addVenue", async (req, res) => {
  const data = new CheckupVenue({
    name: req.body.name,
    location: req.body.location,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json({ type: "success", data: dataToSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint: /api/getAllVenues
// Returns: List of venues available
router.get("/getAllVenues", async (req, res) => {
  try {
    const data = await CheckupVenue.find();
    res.json({ type: "success", data });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
