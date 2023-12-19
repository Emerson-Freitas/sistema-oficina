import { Request, Response, Router } from "express";
import UserController from "./controllers/UserController";
import GenericController from "./controllers/GenericController";
import RoleController from "./controllers/RoleController";
import AuthController from "./controllers/AuthController";
import { authMiddleware } from "./middleware/authMiddleware";

const router = Router();

router.post("/users", UserController.createUser)
router.get("/users", UserController.findUsers)
router.put("/users/:id", UserController.editUser)
router.delete("/:table/:id", authMiddleware, GenericController.genericDelete)
router.get('/roles', RoleController.findRoles)
router.post('/login', AuthController.login)
router.get("/profile", authMiddleware, AuthController.getProfile)

export default router