const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.ObjectId,
  venueId: mongoose.Schema.ObjectId,
  scheduledAt: {
    required: true,
    type: String,
  },
  status: {
    type: String,
    enum: ["ALLOCATED", "COMPLETE", "CANCELLED"],
    default: "ALLOCATED",
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("EmployeeSlot", dataSchema);
