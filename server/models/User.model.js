const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["victim", "volunteer", "ngo", "admin"],
      required: true,
    },

    phone: {
      type: String,
    },

    profile: {
      type: String,
      default: "",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0,0],
      },
    },

    skills: {
      type: [String],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);