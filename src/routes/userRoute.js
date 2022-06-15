const express = require("express")
const userRoute = express.Router()
const userController = require("../controllers/userController")

userRoute.post("/getAllUsers", userController.getAllUsers);
userRoute.post("/createUser", userController.createUser);
userRoute.put("/updateUser/:id", userController.updateUser);
userRoute.get("/getUserById/:id", userController.getUserById);
userRoute.get("/addDummyData", userController.addDummyData);

module.exports = userRoute;
