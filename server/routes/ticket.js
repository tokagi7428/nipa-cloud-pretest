const mysql = require('mysql2')
const express = require('express')
const ticketRouter = express.Router()

const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'nipacloud',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    queueLimit: 0,
    idleTimeout: 60000
})



ticketRouter.get("/tickets", (req, res) => {
    // const status = "rejected"
    db.query("SELECT * FROM tickets ORDER BY status , updated_time  desc", (err, result) => {
        if (err) {
            console.log("error : ", err)
        } else {
            // console.log({ result })
            // const newTicket = {
            //     pending: [],
            //     accepted: [],
            //     resolved: [],
            //     rejected: []
            // }
            // result.map(ticket => {
            //     if (ticket.status == 'pending') {
            //         newTicket.pending.push(ticket)
            //     } else if (ticket.status == 'accepted') {
            //         newTicket.accepted.push(ticket)
            //     } else if (ticket.status == 'resolved') {
            //         newTicket.resolved.push(ticket)
            //     } else if (ticket.status == 'rejected') {
            //         newTicket.rejected.push(ticket)
            //     }
            // })
            // console.log({ newTicket })
            res.status(200).json({ data: result, msg: "success" })
        }
    })
})

ticketRouter.get(`/tickets/:id`, (req, res) => {
    const id = req.params.id
    db.query(`SELECT * FROM tickets WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log({ err })
        }
        console.log(result.length > 0)
        if (result.length > 0) {
            res.status(201).json({ data: result, msg: "success" })
        } else {
            res.status(201).json({ data: result, msg: "not found" })
        }
    })
})

// Create tickets
ticketRouter.post(`/tickets/create`, (req, res) => {
    const title = '-';
    const description = '-';
    const contact = '-';
    const created_time = Number((new Date().getTime() / 1000))
    const updated_time = ''
    const status = 'pending'
    db.query("INSERT INTO tickets (title,description,contact,created_time,updated_time,status) VALUES (?,?,?,?,?,?)",
        [title, description, contact, created_time, updated_time, status],
        (err, result) => {
            if (err) {
                console.log({ err })
            } else {
                console.log({ result })
                res.status(201).json({ data: result, msg: "Create successfully" })
            }
        })
})

// update tickets
ticketRouter.put(`/tickets/:id`, (req, res) => {
    const id = req.params.id
    const title = req.body.title;
    const description = req.body.description;
    const contact = req.body.contact;
    // const created_time = Number((new Date().getTime() / 1000))
    const updated_time = Number((new Date().getTime() / 1000))
    const status = 'accepted'
    const sql = `UPDATE tickets SET title = ?, description = ?, 
    contact=?,updated_time=?,status=? WHERE id=?`
    db.query(sql,
        [title, description, contact, updated_time, status, id],
        (err, result) => {
            if (err) {
                console.log({ err })
            } else {
                console.log({ result })
                res.status(201).json("Create successfully")
            }
        })
})

ticketRouter.put(`/tickets/rejected/:id`, (req, res) => {
    const id = req.params.id
    const status = 'rejected'
    // const created_time = Number((new Date().getTime() / 1000))
    const updated_time = Number((new Date().getTime() / 1000))
    db.query(`UPDATE tickets SET status = ?,updated_time=?  WHERE id = ?`,
        [status, updated_time, id], (err, result) => {
            if (err) {
                console.log({ err })
            } else {
                console.log({ result })
                res.status(201).send(`Rejected successfully`)
            }
        })
})

// update tickets to resolved
ticketRouter.put(`/tickets/resolved/:id`, (req, res) => {
    const id = req.params.id
    const title = req.body.title;
    const description = req.body.description;
    const contact = req.body.contact;
    const updated_time = Number((new Date().getTime() / 1000))
    const status = 'resolved'
    const sql = `UPDATE tickets SET title = ?, description = ?, 
    contact=?,updated_time=?,status=? WHERE id=?`
    db.query(sql,
        [title, description, contact, updated_time, status, id],
        (err, result) => {
            if (err) {
                console.log({ err })
            } else {
                console.log({ result })
                res.status(201).json("Resolved successfully")
            }
        })
})

module.exports = ticketRouter