const express = require("express");
const Form = require("../models/Form"); // Import Form model

const router = express.Router();

// Create a new form
router.post("/create", async (req, res) => {
  try {
    const { title, description, questions, headerImage } = req.body;

    // Create a new form
    const newForm = new Form({
      title,
      description,
      questions,
      headerImage,
    });

    await newForm.save(); // Save to DB

    res.status(201).json(newForm); // Respond with created form
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating form", error: error.message });
  }
});

// Get all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find(); // Fetch all forms
    res.status(200).json(forms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching forms", error: error.message });
  }
});

module.exports = router;
