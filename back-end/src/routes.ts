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
import ReportController from "./controllers/ReportController";
import DashboardController from "./controllers/DashboardController";
import NotificationController from "./controllers/NotificationController";
import { canAuthorizeBudgetMiddleware } from "./middleware/canAuthorizeBudgetMiddleware";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

router.post("/users", isAdminMiddleware, UserController.createUser)
router.get("/users", isAdminMiddleware, UserController.findUsers)
router.post('/budgets', authMiddleware, BudgetController.createBudget)
router.get('/budgets', authMiddleware, BudgetController.findBudgets)
router.get('/budgets/:id', authMiddleware, BudgetController.findBudgetsByUser)
router.put('/budgets/:id', authMiddleware, BudgetController.editBudget)
router.post('/vehicles', authMiddleware, VehicleController.createVehicle)
router.get("/clients", authMiddleware, UserController.findClients)
router.put("/users/:id", authMiddleware, UserController.editUser)
router.delete("/:table/:id", authMiddleware, GenericController.genericDelete)
router.get('/roles', isAdminMiddleware, RoleController.findRoles)
router.post('/login', AuthController.login)
router.get("/profile", authMiddleware, AuthController.getProfile)
router.get("/admin/dashboard", isAdminMiddleware, DashboardController.infoDashboardAdmin)
router.post("/users/picture", authMiddleware, upload.single('file'), UserController.uploadPicture)
router.get("/report/excel", authMiddleware, ReportController.reportExcel)
router.get("/dashboard", authMiddleware, DashboardController.budgetsStatus)
router.get("/admin/graph", isAdminMiddleware, DashboardController.dataGraphic)
router.put("/accept/:id", canAuthorizeBudgetMiddleware, BudgetController.acceptBudget)
router.put("/reject/:id", canAuthorizeBudgetMiddleware, BudgetController.rejectBudget)
router.get("/admin/vehicles/:id", isAdminMiddleware, VehicleController.findVehicles)
router.get("/client/vehicles", authMiddleware, VehicleController.findVehiclesClient)
router.get('/vehicles/:id', authMiddleware, VehicleController.vehiclesByUser)
router.get("/types", authMiddleware, VehicleController.findTypes)
router.get("/budgets/vehicle/:id", authMiddleware, BudgetController.findBudgetsByVehicle)

//notifications
router.get("/notifications/:id", authMiddleware, NotificationController.notificationsByUserClient)
router.get("/notifications", isAdminMiddleware, NotificationController.notificationsAdminAndEmployee)

export default router