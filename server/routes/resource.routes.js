const { Router } = require("express");
const authenticateToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const { addResource,getResource,updateQuantity,getLowStock } = require("../controllers/resource.controller");

const router = Router(); 

router.post("/create",authenticateToken,authorizeRoles("ngo"),addResource);
router.get("/all", authenticateToken,authorizeRoles("ngo"),getResource);
router.put("/update/:id",authenticateToken,authorizeRoles("ngo"),updateQuantity);
router.get("/lowstock",authenticateToken,authorizeRoles("ngo"),getLowStock);



module.exports = router;
