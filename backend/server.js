const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")

//Handle the uncaught exceptions
process.on("uncaughtException", err => {
    console.log(`Error: ${err.stack}`)
    console.log("Shutting down due to uncaught exception")
    process.exit(1)
})


//setting config file
dotenv.config({path: "backend/config/config.env"})


//connecting to the database
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

//handle unhandled Promise rejections

process.on("unhandledRejection", err => {
    console.log(`error: ${err.message}`)
    console.log("shutting down the server due to unhandled Promise rejection")
    server.close(() => {
        process.exit(1)
    })
})