const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["text", "grid", "checkbox"], // Allow only these types of questions
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // For checkbox and grid options
  },
  image: {
    type: String, // URL to the image
  },
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  questions: [questionSchema], // Array of questions
  headerImage: {
    type: String, // URL to the header image
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
