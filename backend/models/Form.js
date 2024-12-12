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
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      questionText: { type: String, required: true },
      questionType: {
        type: String,
        enum: ["text", "grid", "checkbox"],
        required: true,
      },
      options: [String], // For grid or checkbox
    },
  ],
  shareToken: { type: String, unique: true },
});

formSchema.pre("save", function (next) {
  if (!this.shareToken) {
    this.shareToken = Math.random().toString(36).substr(2, 9); // Generate a random 9-char token
  }
  next();
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
