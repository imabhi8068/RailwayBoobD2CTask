const { tickets } = require("../js/db")

const yup = require("yup")


async function bookHandler(req, res, next) {
    try {
        let { seats } = req.query
        if (!seats && parseInt(seats) <= 0) throw new Error("Seats are not passed")

        seats = parseInt(seats)

        if (seats > 7) throw new Error("You can't reserve more then 7 seats in on ticket")
        let coaches = await tickets.findOne({ id: process.env.DATA_ID })

        for (let i = 0; i < coaches.seats.length; i++) {
            let total = coaches.seats[i].total
            let filled = coaches.seats[i].filled
            let empty = total - filled
            if (empty == seats || empty > seats) {
                let temp = coaches.seats[i].filled
                coaches.seats[i].filled += seats
                tickets.update({ id: process.env.DATA_ID }, { $set: coaches })
                res.json(new Array(seats).fill(0).map((e, index) => i * 7 + temp + index + 1))
                return
            }
        }
        let seat_number = []
        let i = 0
        let temp = seats
        let _emp = 0
        while (true) {
            let total = coaches.seats[i].total
            let filled = coaches.seats[i].filled
            let empty = total - filled
            _emp = temp - empty
            if (_emp > 0) {
                coaches.seats[i].filled += empty
                seat_number.push(...new Array(empty).fill(0).map((e, index) => 7 * i + filled + index + 1))
            }
            else {
                coaches.seats[i].filled += temp
                seat_number.push(...new Array(temp).fill(0).map((e, index) => 7 * i + filled + index + 1))

            }
            temp -= empty
            i += 1
            if (temp <= 0) {
                tickets.update({ id: process.env.DATA_ID }, { $set: coaches })
                res.json(seat_number)
                return
            }
            if (i == coaches.seats.length) {
                throw new Error("No Seat Available")
            }
        }
    } catch (err) {
        next(err)
    }
}

async function getSeatsHandler(req, res, next) {
    try {
        let seats = await tickets.findOne({ id: process.env.DATA_ID })
        res.json(seats.seats)
    } catch (err) {
        next(err)
    }
}

module.exports = { bookHandler, getSeatsHandler }