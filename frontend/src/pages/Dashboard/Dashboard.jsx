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
            res.data.data.map(ticket => {
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
            console.log({ pending, accepted, rejected, resolved })
        }
        getTickets()
    }, [])

    const infoForm = (data, color = 'success') => {
        return data.map((ticket, idx) => {
            return (
                <div className={`bg-${color} p-2 rounded-2 w-100`} key={idx} style={{ padding: '0 -10px' }}>
                    <h5 className='text-capitalize border-bottom pb-2 '>ชื่อ {ticket.title}</h5>
                    <p className='d-flex justify-content-between py-1'><span>คำอธิบาย</span> {ticket.description}</p>
                    <p className='d-flex justify-content-between'><span>เบอร์โทร</span> {ticket.contact}</p>
                    <p className='d-flex justify-content-between py-1' style={{ fontSize: "14px" }}><span>วันที่สร้าง</span> {convertNumToDate(ticket.created_time)}</p>
                    <p className='d-flex justify-content-between' style={{ fontSize: "14px" }}><span>วันที่แก้ไขล่าสุด</span> {convertNumToDate(ticket.updated_time)}</p>
                </div>
            )
        })
    }

    return (
        <Container>
            <h1 className='text-center mt-5'>Dashboard</h1>
            <div className='rounded-3 w-100'>
                <div className="d-flex justify-content-center my-5 gap-4 w-100 flex-md-nowrap flex-wrap" >

                    <div className="d-flex flex-column gap-2 w-100 bg-secondary p-3 " style={{ height: "max-content" }}>
                        <h5 className='text-white'>Pending</h5>
                        {
                            infoForm(pending, 'warning')
                        }
                    </div>


                    <div className="d-flex flex-column gap-2 w-100 bg-secondary p-3" style={{ height: "max-content" }}>
                        <h5 className='text-white'>Accepted</h5>
                        {
                            infoForm(accepted, 'success')
                        }
                    </div>
                    <div className="d-flex flex-column gap-2 w-100 bg-secondary p-3 " style={{ height: "max-content" }}>
                        <h5 className='text-white'>Resolved</h5>
                        {
                            infoForm(resolved, 'info')
                        }
                    </div>
                    <div className="d-flex flex-column gap-2 w-100 bg-secondary p-3 " style={{ height: "max-content" }}>
                        <h5 className='text-white'>Rejected</h5>
                        {
                            infoForm(rejected, 'danger')
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Dashboard