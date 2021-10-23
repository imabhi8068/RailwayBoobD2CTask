const app = require("./js/app")

require("dotenv").config()

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`listening to port -> ${server.address().port}`)
})