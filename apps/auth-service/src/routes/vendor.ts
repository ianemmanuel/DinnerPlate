import express, { Router } from "express"
import { registerVendor, loginVendor, createProfile, getProfileById, updateProfile, deleteProfile, addProfileImages, removeProfileImages, verifyVendorEmail, sendVendorOtp, createBankAccount, updateBankAccount } from "../controller/vendor"
import { verifyJWT } from "../middleware/verifyJWT"


const vendorRouter: Router = express.Router()

vendorRouter.post("/registration", registerVendor)
vendorRouter.post("/login", loginVendor)
vendorRouter.post('/verify-email', verifyVendorEmail)
vendorRouter.post('/send-otp', sendVendorOtp)
vendorRouter.post('/create-profile',verifyJWT,createProfile)
vendorRouter.get('/get-profile/:id',verifyJWT,getProfileById)
vendorRouter.put('/update-profile/:id',verifyJWT,updateProfile)
vendorRouter.delete('/delete-profile/:id', deleteProfile)
vendorRouter.post('/:id/images', addProfileImages)
vendorRouter.delete('/:id/images', removeProfileImages)
// POST: Create vendor bank account
vendorRouter.post('/bank-account', verifyJWT, createBankAccount)
vendorRouter.patch('/bank-account', verifyJWT, updateBankAccount)


export default vendorRouter