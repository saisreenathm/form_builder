const express = require("express");
const Form = require("../models/Form"); // Import Form model
const Response = require("../models/Response");
const router = express.Router();
const mongoose = require("mongoose");

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

// Submit a response
router.post("/:formId/submit", async (req, res) => {
  try {
    const { formId } = req.params;

    // Validate formId
    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({ message: "Invalid form ID" });
    }

    const { responses } = req.body;

    // Validate if the form exists
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Save the response
    const newResponse = new Response({
      formId,
      responses,
    });

    await newResponse.save();

    res.status(201).json({
      message: "Response submitted successfully",
      response: newResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting response", error: error.message });
  }
});

// Fetch responses for a form
router.get("/:formId/responses", async (req, res) => {
  try {
    const { formId } = req.params;

    // Fetch responses linked to the form
    const responses = await Response.find({ formId });

    res.status(200).json(responses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching responses", error: error.message });
  }
});
//Fetch forms by shareToken
router.get("/share/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const form = await Form.findOne({ shareToken: token });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching form", error: error.message });
  }
});

module.exports = router;
