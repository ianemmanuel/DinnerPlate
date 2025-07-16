
import express from 'express'
import cors from "cors"
import { errorMiddleware } from '@packages/error-handler/error-middleware'
import cookieParser from 'cookie-parser'
import router from './routes/user'
import tokenRouter from './routes/tokens'
import swaggerUi from "swagger-ui-express"
import logoutRouter from './routes/logout'
import vendorRouter from './routes/vendor'
import fetchUseRouter from './routes/fetchUser'
const swaggerDocument = require("./swagger-output.json")

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
  })
)

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cookieParser())



//*Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get("/docs-json", (req,res) => {
    res.json(swaggerDocument)
})
app.use("/api/auth", logoutRouter)
app.use("/api/auth", tokenRouter)
app.use("/api/user", router)
app.use("/api/vendor", vendorRouter)
app.use("/api/auth", fetchUseRouter)


app.use(errorMiddleware)


const port = process.env.PORT || 6001

const server = app.listen(port, () => {
  console.log(`Auth service is running at http://localhost:${port}/api`)
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`)
})
server.on('error', (err)=>{
  console.log("Server Error: ", err)
})
