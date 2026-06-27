const { getIO } = require("../config/socketInstance")
const SOSAlert = require("../models/SOSAlert.model");

exports.createSos = async (req, res) => {
    try {
        const { emergency, description, severity, location } = req.body;
        const victimId = req.user.id;

        const sosAlert = await SOSAlert.create({
            victim: victimId,
            emergency,
            description,
            severity,
            location
        });

        const io = getIO()
            console.log("IO instance:", io ? "exists" : "undefined")
            if(io) {
            io.emit("sos:received", sosAlert)
        }
        return res.status(201).json({
            success: true,
            message: "SOS alert created successfully",
            data: sosAlert
        });
    } catch (error) {
        console.error("SOS CREATE ERROR:", error.message)
        return res.status(500).json({
            success: false,
            message: "Failed to create SOS alert",
            error: error.message
        });
    }
};

exports.getAllSOS = async(req,res) => {
    try {
        const alerts = await SOSAlert
            .find({ status: "pending" })
            .populate("victim" , "name phone email")
            .sort({ createdAt: -1 });

            return res.status(200).json ({
                success: true,
                data: alerts
            });

        
    } catch(error) {
        return res.status(500).json ({
            success: false,
            message: error.message
        });
    }

}; 

exports.acceptSOS = async(req,res) => {
    try {
        const { id } = req.params;
        const volunteerId = req.user.id;

        const sos = await SOSAlert.findById(id);

        if(!sos) {
            return res.status(404).json ({
                success: false,
                message: "SOS NOt found"
            });

            
        }

        if(sos.status !== "pending") {
            return res.status(400).json ({
                success: false,
                message: "Already accepted"
            });
        }

        const updated = await SOSAlert.findByIdAndUpdate (
            id,
            { status: "accepted", assignedTo: volunteerId },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            data: updated
        });


    } catch (error) {
        return res.status(400).json ({
            message : error.message
        });

    }
};

exports.resloveSOS = async(req,res) => {
    try {
        const { id } = req.params;
        const sos = await SOSAlert.findById(id)
        if(!sos) {
            return res.status(404).json ({
                message: "Sos not found" 
            });
        }

        sos.status = "resolved";
        sos.resolvedAt = Date.now();

        await sos.save();

        return res.status(200).json ({
            success: true,
            data: sos
        });
    } catch(error) {
        return res.status(500).json ({
            success: false,
            message: error.message
        });
    }

};

exports.getMyAlerts = async (req, res) => {
    try {
        const victimId = req.user.id
        const alerts = await SOSAlert.find({ victim: victimId })
            .sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            data: alerts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

