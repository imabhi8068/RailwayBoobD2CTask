require("dotenv").config()

function errorHandler(error, req, res, next) {
    console.log(error)
    res.status(403).json({
        error: true,
        message: error.message,
        stack: process.env.DEPLOY == "dev" ? error.stack : "no stact",
    })
}

module.exports = {
    errorHandler,
}
