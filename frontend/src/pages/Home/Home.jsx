import React, { useEffect, useState } from 'react'
import { Table, Form, Alert } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { convertNumToDate } from '../../../utils/helper'

function Home() {
    const [tickets, setTickets] = useState([])
    const navigate = useNavigate()
    const [status, setStatus] = useState('all')
    const [createNewTicket, setCreateNewTicket] = useState([])
    useEffect(() => {
        const getTickets = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets`)
            const data = res.data.data
            setTickets(data)
        }
        getTickets()
        // console.log(filterTickets())
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

    const createTicket = async () => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tickets/create`)
        console.log(res.data.data.insertId)
        setCreateNewTicket(res.data.data.insertId)
        console.log({ createNewTicket })
        return navigate(`/ticketForm/${res.data.data.insertId}`)
    }

    const clickToForm = (id, status) => {
        if (status != "rejected") {
            navigate(`/ticketForm/edit/${id}`)
        }
    }

    return (
        <Container >
            <div className='mb-3 '>
                <Button className='btn btn-success d-inline-flex gap-1' onClick={createTicket} ><i className="bi bi-plus-circle" style={{ paddingTop: '-5px' }}></i>ซื้อตั๋ว</Button>
            </div>
            <div className="my-3 d-flex align-items-center gap-3">
                <p >ค้นหาตามสถานะ</p>
                <Form.Select aria-label="ค้นหาตามสถานะ" className='w-auto' onChange={(e) => setStatus(e.target.value)}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                </Form.Select>
            </div>
            <div className="position-relative overflow-scroll">
                <Table striped={filterTickets().length > 0} bordered hover={filterTickets().length > 0} >
                    <thead >
                        <tr >
                            <th>Id</th>
                            <th >Title</th>
                            <th >Description</th>
                            <th>Contact Info</th>
                            <th>Create time</th>
                            <th>Update time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            filterTickets().length > 0 ?
                                filterTickets().map((ticket, index) => {
                                    return (
                                        <tr key={index} className={ticket.status == "rejected" ? "opacity-25" : ""} >
                                            <td>{index + 1}</td>

                                            <td style={{ cursor: ticket.status != "rejected" && "pointer" }} onClick={() => clickToForm(ticket.id, ticket.status)}>{ticket.title}</td>

                                            <td>{ticket.description}</td>
                                            {
                                                ticket.contact.length == 10 ?
                                                    <td>{ticket.contact}</td> : <td className='text-center'>-</td>
                                            }
                                            <td>{convertNumToDate(ticket.created_time)}</td>
                                            <td>{convertNumToDate(ticket.updated_time)}</td>
                                            <td>{ticket.status}</td>
                                        </tr>
                                    )
                                })
                                : <tr >
                                    <td colSpan={7}><Alert variant='danger' className='text-center'>Not Found</Alert></td>
                                </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default Home