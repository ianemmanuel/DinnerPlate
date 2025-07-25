
import express from 'express'
import cors from "cors"
import { errorMiddleware } from '@packages/error-handler/error-middleware'
import cookieParser from 'cookie-parser'

import swaggerUi from "swagger-ui-express"
import mealRouter from './routes/meal'

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

app.get("/", (req, res) => {
  res.send({ message: "Hello meal API"})
})



// //*Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// app.get("/docs-json", (req,res) => {
//     res.json(swaggerDocument)
// })

app.use("/api", mealRouter)
app.use(errorMiddleware)


const port = process.env.PORT || 6002

const server = app.listen(port, () => {
  console.log(`Meal service is running at http://localhost:${port}/api`)
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`)
})
server.on('error', (err)=>{
  console.log("Server Error: ", err)
})
