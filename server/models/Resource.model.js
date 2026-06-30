const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema (
    {
        ngo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true

        },

        name: {
            type: String,
            required: true,
            trim: true
        },
        
        category: {
            type: String,
            enum: ["food", "water", "medical", "shelter", "clothes"],
            required: true
        },

        quantity: {
            type: Number,
            min: 0,
            required: true
        },

        unit: {
            type: String,
            trim: true,
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
            },
        },

        lowStockThreshold: {
            type: Number,
            required: true,
            min: 0
        },

    },
    {
        timestamps: true,
    }
);

    ResourceSchema.index({ location: "2dsphere"});

    module.exports = mongoose.model("Resource",ResourceSchema);


