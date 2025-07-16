import express, { Router } from "express"

import isAuthenticated from "@packages/middleware/isAuthenticated"
import { verifyJWT } from "../middleware/verifyJWT"
import { handleLogout } from "../controller/logout"



const logoutRouter: Router = express.Router()

logoutRouter.get('/logout', handleLogout)

export default logoutRouter