import express from "express"
import { verifyJWT } from "../middleware/verifyJWT"

const fetchUseRouter = express.Router()

fetchUseRouter.get("/fetch-user", verifyJWT, (req, res) => {
  // Here, req.user is already attached by your middleware
  return res.json({ user: req.user })
})

export default fetchUseRouter
