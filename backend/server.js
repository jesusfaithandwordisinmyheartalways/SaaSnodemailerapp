

require('dotenv').config({path: './config/.env'})
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
   

console.log('EMAIL USER', process.env.EMAIL_USER);
console.log('EMAIL PASSWORD', process.env.EMAIL_PASSWORD);

app.use(cors());
app.use(bodyParser.json());

const EMAIL_SEND_OUT = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
})


app.post('/submit', (req, res) => {
    const { emailTo, emailSubject, emailText } = req.body;
    const userEmailData = {
        from: process.env.EMAIL_USER,
        to: emailTo,
        subject: emailSubject,
        text:emailText
    }
    EMAIL_SEND_OUT.sendMail(userEmailData, (error, info) => {
         if(error) {
            console.log('Error', error)
            return res.status(500).send('Email was not sent successfully')
         } else {
            return res.status(200).send('Email was sent successfully')
         }
    })
})



app.get('/', (req, res) =>{
        return res.status(200).send('Server is on 200 status')
})



const SERVER_PORT_NUMBER = process.env.PORT ||  8005
app.listen(SERVER_PORT_NUMBER, () =>{
    console.log(`server is on: ${SERVER_PORT_NUMBER}`)
})