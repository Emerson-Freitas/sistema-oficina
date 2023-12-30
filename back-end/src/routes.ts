import { Request, Response, Router } from "express";
import UserController from "./controllers/UserController";
import GenericController from "./controllers/GenericController";
import RoleController from "./controllers/RoleController";
import AuthController from "./controllers/AuthController";
import { authMiddleware } from "./middleware/authMiddleware";
import BudgetController from "./controllers/BudgetController";
import { isAdminMiddleware } from "./middleware/isAdminMiddleware";
import VehicleController from "./controllers/VehicleController";
import uploadConfig from './config/multer'
import multer from "multer";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

router.post("/users", UserController.createUser)
router.get("/users", UserController.findUsers)
router.post('/budgets', BudgetController.createBudget)
router.get('/budgets', BudgetController.findBudgets)
router.post('/vehicles', VehicleController.createVehicle)
router.get("/clients", UserController.findClients)
router.put("/users/:id", UserController.editUser)
router.delete("/:table/:id", authMiddleware, GenericController.genericDelete)
router.get('/roles', RoleController.findRoles)
router.post('/login', AuthController.login)
router.get("/profile", authMiddleware, AuthController.getProfile)
router.get("/admin/dashboard", isAdminMiddleware, BudgetController.findBudgets)
router.post("/users/picture", authMiddleware, upload.single('file'), UserController.uploadPicture)

export default router