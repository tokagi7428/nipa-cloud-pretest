import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
function TicketForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [contact, setContact] = useState('')
    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const navigate = useNavigate()

    const createTicket = async (e) => {
        e.preventDefault()
        if (title.length <= 0 || description.length <= 0 || contact.length <= 0) {
            return alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        }
        if (contact.length != 10) {
            return alert('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
        }
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/tickets/${id}`, { title, description, contact })
        console.log({ res })
        return navigate('/')
    }
    const CancleTicket = async (e) => {
        e.preventDefault()
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/tickets/rejected/${id}`)
        return navigate('/')
    }
    return (
        <Container>
            <Form>
                <h1>TicketForm</h1>
                <Form.Group className="mb-2" controlId='title'>
                    <Form.Label >Title</Form.Label>
                    <Form.Control type="text" placeholder='Enter your title' onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2" controlId='description'>
                    <Form.Label >Description</Form.Label>
                    <Form.Control type="text" placeholder='Enter your description' onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-2" controlId='contact'>
                    <Form.Label >Contact Information</Form.Label>
                    <Form.Control type="number" placeholder='Enter your contact' onChange={(e) => setContact(e.target.value)} />
                </Form.Group>
                <div className="d-flex gap-2 justify-content-between">
                    <Button variant="primary" type="submit" onClick={createTicket} >
                        Create
                    </Button>
                    <Button variant="danger" type="submit" onClick={CancleTicket} >
                        Cancle
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default TicketForm