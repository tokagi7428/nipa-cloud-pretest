const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const ticketRouter = require('./routes/ticket.js')

dotenv.config()

const app = express()
app.use(cors())
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', ticketRouter)

app.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}`) })