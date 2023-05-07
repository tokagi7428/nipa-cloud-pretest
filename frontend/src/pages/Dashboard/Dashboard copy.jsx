import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { convertNumToDate } from '../../../utils/helper'

function Dashboard() {
    const [tickets, setTickets] = useState([])
    const [status, setStatus] = useState('all')
    const [pending, setpending] = useState([])
    const [accepted, setaccepted] = useState([])
    const [resolved, setresolved] = useState([])
    const [rejected, setrejected] = useState([])
    useEffect(() => {
        const getTickets = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets`)
            const data = res.data.data
            // console.log({ data })
            setTickets(data)
            tickets.map(ticket => {
                if (ticket.status == 'pending') {
                    pending.push(ticket)
                } else if (ticket.status == 'accepted') {
                    accepted.push(ticket)
                } else if (ticket.status == 'resolved') {
                    resolved.push(ticket)
                } else if (ticket.status == 'rejected') {
                    rejected.push(ticket)
                }
            })
        }
        getTickets()
    }, [tickets])

    const filterTickets = () => {
        let newData = []
        tickets.map(ticket => {
            if (status == 'all') {
                newData.push(ticket)
            } else if (status == 'pending' && ticket.status == 'pending') {
                newData.push(ticket)
            } else if (status == 'accepted' && ticket.status == 'accepted') {
                newData.push(ticket)
            } else if (status == 'resolved' && ticket.status == 'resolved') {
                newData.push(ticket)
            } else if (status == 'rejected' && ticket.status == 'rejected') {
                newData.push(ticket)
            }
        })
        return newData;
    }

    return (
        <Container>
            <h1>Dashboard</h1>
            <div>
                <div className="d-flex gap-4">
                    {
                        tickets.map((ticket, idx) => {
                            return (
                                <div className="" key={idx}>
                                    {ticket.status == "accepted" ?
                                        <div className=" bg-success" >
                                            <p>{ticket.title}</p>
                                            <p>{ticket.description}</p>
                                            <p>{ticket.contact}</p>
                                            <p>{convertNumToDate(ticket.created_time)}</p>
                                            <p>{convertNumToDate(ticket.updated_time)}</p>
                                        </div>
                                        : ticket.status == "pending" ?
                                            <div className="d-flex flex-column">
                                                <div className=" bg-info" >
                                                    <p>{ticket.title}</p>
                                                    <p>{ticket.description}</p>
                                                    <p>{ticket.contact}</p>
                                                    <p>{convertNumToDate(ticket.created_time)}</p>
                                                    <p>{convertNumToDate(ticket.updated_time)}</p>
                                                </div>
                                            </div>
                                            : ticket.status == "resolved" ?
                                                <div className="d-flex">
                                                    <div className="bg-warning" >
                                                        <p>{ticket.title}</p>
                                                        <p>{ticket.description}</p>
                                                        <p>{ticket.contact}</p>
                                                        <p>{convertNumToDate(ticket.created_time)}</p>
                                                        <p>{convertNumToDate(ticket.updated_time)}</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className="bg-danger" >
                                                    <p>{ticket.title}</p>
                                                    <p>{ticket.description}</p>
                                                    <p>{ticket.contact}</p>
                                                    <p>{convertNumToDate(ticket.created_time)}</p>
                                                    <p>{convertNumToDate(ticket.updated_time)}</p>
                                                </div>}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Container>
    )
}

export default Dashboard