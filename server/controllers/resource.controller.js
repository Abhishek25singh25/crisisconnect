const Resource = require("../models/Resource.model");

exports.addResource = async (req,res) => {
    try {
        const  { name,category,quantity,unit,location,lowStockThreshold }  = req.body
        const ngoId = req.user.id;
        const resource = await Resource.create ({
            ngo: ngoId,
            name,
            category,
            quantity,
            unit,
            location,
            lowStockThreshold
        });

        return res.status(201).json ({
            success: true,
            message:"Resource added successfully",
            data: resource
        });
    } catch (error) {
        return res.status(500).json ({
            success: false,
            message: error.message
        });
    }
};

exports.getResource = async (req,res) => {
    try {
        const ngoId = req.user.id;

        const resource = await Resource
            .find({ ngo: ngoId })
            .populate("ngo","name email")
            .sort({ createdAt: -1 });

        return res.status(200).json ({
            success: true,
            data: resource
        });

    } catch(error) {
        return res.status(500).json ({
            success: false,
            message: error.message
        });
    }
};

exports.updateQuantity = async (req,res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const resource = await Resource.findById(id);

        if(!resource) {
            return res.status(404).json ({
                message: "Resource not found"
            });
        }

        resource.quantity = quantity;

        await resource.save();

        return res.status(200).json({
            success: true,
            data: resource
        });

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getLowStock = async(req,res) => {
    try {
        const ngoId = req.user.id;

        const resource = await Resource.find({
            ngo: ngoId,
            $expr: {
                $lt:["$quantity","$lowStockThreshold"]
            }
        });

        return res.status(200).json({
            success: true,
            data: resource
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

