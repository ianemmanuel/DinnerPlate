import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: "Meal Service API",
        description: "Automatically generated swagger docs",
        version: "1.0.0"
    },
    host: "localhost:6002",
    schemes: ["http"],
}

const outputFile = "./swagger-output.json"
const endpointsFiles = ["./routes/meal.ts"]

swaggerAutogen()(outputFile, endpointsFiles, doc)