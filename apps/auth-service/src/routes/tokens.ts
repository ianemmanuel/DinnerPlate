import express from 'express'
import { handleRefreshToken } from '../controller/tokens'
import { verifyJWT } from "../middleware/verifyJWT"

const tokenRouter = express.Router()

tokenRouter.post('/refresh-token', handleRefreshToken)
tokenRouter.get('/verify-access-token', verifyJWT, (req, res) => {
  return res.json({ 
    user: req.user 
  })
})

export default tokenRouter