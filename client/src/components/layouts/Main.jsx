import { useEffect, useState } from "react"

import { TicketIcon } from "@heroicons/react/outline";
import Button from "../Button";

import axios from "axios"
import { booking_api, _availableSeats } from "../../apis";

function Main() {
  const [input, setInput] = useState("")
  const [availableSeats, setAvailableSeats] = useState([])
  const [seat_numbers, setSeatNumbers] = useState([])
  useEffect(() => {

  }, [])

  async function bookSeat(e) {
    e.preventDefault()
    if (input.length === 0) {
      alert("Enter Number of seats")
      return
    }
    if (input.length === 0 && parseInt(input) < 0) return
    try {
      let { data } = await axios.get(booking_api, {
        params: {
          seats: input
        }
      })
      setSeatNumbers(data)
      console.log(data)
      fetchSeats()
    } catch (err) {
      console.log(err)
    }
  }
  async function fetchSeats() {
    try {
      let { data } = await axios.get(_availableSeats)
      setAvailableSeats(data)
      console.log(data)

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="main_container">
      <div className="p-20 pt-13 border border-gray-100 shadow-lg rounded-2xl my-card">
        <form className="flex flex-col justify-center w-full" onSubmit={bookSeat}>
          <div className="relative">
            <TicketIcon className="absolute z-10 w-8 h-8 text-black text-opacity-30 top-3 left-3" />
            <input
              type="text"
              name=""
              id=""
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter No. of Seats"
              className="w-full px-3 py-4 text-lg leading-tight text-gray-700 border border-gray-100 shadow appearance-none rounded-xl caret-blue-600 pl-14 focus:ring focus:ring-blue-500 focus:outline-none focus:shadow-outline "
            />
          </div>
          <div className="flex justify-between w-full gap-4 mt-16">
            <Button btnName="Check Seat" type="button" onClick={fetchSeats} />
            <Button btnName="Book Now" type="submit" />
          </div>
        </form>
        {
          seat_numbers.length > 0 ? (
            <div className="ticketdisplay flex flex-col border border-grey mt-4 rounded-md p-5 shadow">
              <div className="ticket_header relative flex gap-2 mb-2 items-center font-semibold">
                <TicketIcon className="z-10 w-8 h-8 text-black text-opacity-30 top-3 left-3" />
                <div className="">Booked Tickets</div>
              </div>
              <div className="ticket_number flex gap-2">
                {seat_numbers.map((ticket, i) => <div key={i} className="bg-green-500 border border-green-600 w-6 h-6 rounded flex justify-center items-center text-green-900 font-bold">{ticket}</div>)}
              </div>
            </div>
          ) : ""
        }
        {
          availableSeats.length > 0 ? (
            <div className="ticketdisplay flex flex-col border border-grey mt-4 rounded-md p-5 shadow">
              <div className="ticket_header relative flex gap-2 mb-2 items-center font-semibold">
                <TicketIcon className="z-10 w-8 h-8 text-black text-opacity-30 top-3 left-3" />
                <div className="">Booked Tickets</div>
              </div>
              <div className="ticket_number flex flex-col gap-2">
                {availableSeats.map((row, i) => (
                  <div className="row flex gap-2" key={i}>
                    {new Array(row.total).fill(0).map((e, j) => <div key={i} className={`border ${j < row.filled ? "bg-red-500 border-red-600" : "bg-green-500 border-green-600"}  w-6 h-6 rounded flex justify-center items-center text-green-900 font-bold`} >{7 * i + j + 1}</div>)}
                  </div>
                ))}
              </div>
            </div>
          ) : ""
        }
      </div>
    </div>
  );
};

export default Main;
