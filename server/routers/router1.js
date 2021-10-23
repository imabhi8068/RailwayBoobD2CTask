const { Router } = require("express")

const { bookHandler, getSeatsHandler } = require("../handlers")
const { tickets } = require("../js/db")


const router = Router()

// router.get("/", bookingHandler)
router.get("/book", bookHandler)
router.get("/seats", getSeatsHandler)
router.get("/ticketReset", (req, res) => {
    let data = new Array(10).fill({ filled: 0, total: 4 })
    data.push({ filled: 0, total: 3 })
    tickets.update({ id: process.env.DATA_ID }, { $set: { seats: data } })
    res.json({ reset: "done" })
})

module.exports = router
