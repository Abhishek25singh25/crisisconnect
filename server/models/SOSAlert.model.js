const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema(
    {
        victim: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        emergency: {
            type: String,
            enum: ["medical", "fire", "rescue", "flood", "other"],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        severity: {
            type: String,
            enum: ["critical", "urgent", "stable"],
            required: true
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "in-progress", "resolved"],
            default: "pending"
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        images: {
            type: [String],
            default: []
        },
        resolvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

sosSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("SOS", sosSchema);
