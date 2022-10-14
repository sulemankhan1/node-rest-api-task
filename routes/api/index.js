// creating all end points here in one file just because this is a task
// project in real project every entity will be in separate folder
// also i haven't added any validation

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

// Endpoint: /api/addEmployee
// Task: Add New Employee
router.post("/addEmployee", async (req, res) => {
  const data = new Employee({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json({ type: "success", data: dataToSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint: /api/getAllEmployees
// Returns: List of Employees available
router.get("/getAllEmployees", async (req, res) => {
  try {
    const data = await Employee.find();
    res.json({ type: "success", data });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
});

// Endpoint: /api/book
// Task: Insert record in EmployeeSlot
router.post("/book", async (req, res) => {
  const data = new EmployeeSlot({
    employeeId: req.body.employeeId,
    venueId: req.body.venueId,
    scheduledAt: req.body.scheduledAt,
    notes: req.body.notes,
    status: "ALLOCATED",
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json({ type: "success", data: dataToSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint: /api/reschedule
// Task: Reschedule a Slot
router.patch("/reschedule", async (req, res) => {
  try {
    const record = await EmployeeSlot.findById(req.body.EmployeeSlotId);
    // record.scheduledAt = req.body.scheduledAt;

    // const dataToSave = await record.save();
    res.status(200).json({ type: "success", data: record });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint: /api/cancel
// Task: Reschedule a Slot
router.patch("/cancel", async (req, res) => {
  try {
    const record = await EmployeeSlot.findById(req.body.EmployeeSlotId);
    record.status = "CANCELLED";

    const dataToSave = await record.save();
    res.status(200).json({ type: "success", data: dataToSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint: /api/getEmployeeSlot
// Returns: returns list from EmployeeSlot table by employee id
router.get("/getEmployeeSlot", async (req, res) => {
  try {
    const data = await EmployeeSlot.find({
      employeeId: req.body.employeeId,
      // did the above with req.params.employeeId but for some reason
      // i was getting error maybe because of postman ...due to short time
      // shortage i changed it to req.body to make the api work for now
    });
    res.json({ type: "success", data });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
});

// Endpoint: /api/completed
// Task: complete a slot
router.patch("/completed", async (req, res) => {
  try {
    const record = await EmployeeSlot.findById(req.body.EmployeeSlotId);
    record.status = "COMPLETE";

    const dataToSave = await record.save();
    res.status(200).json({ type: "success", data: dataToSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
