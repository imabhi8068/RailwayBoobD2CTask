const monk = require("monk")

const URI = "localhost/ticket_booking"
const db = monk(URI)
const tickets = db.get("tickets")

    ; (async function qinit() {
        let coach = await tickets.findOne({ id: process.env.DATA_ID })
        if (coach) return
        let data = new Array(11).fill({ filled: 0, total: 7 })
        data.push({ filled: 0, total: 3 })
        tickets.insert({
            id: process.env.DATA_ID, seats: data,
        })
    })()

// total_cols*row + i

module.exports = {
    tickets
}