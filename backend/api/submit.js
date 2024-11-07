

require('dotenv').config({path: '/backend/config/.env'})
const nodemailer = require('nodemailer')



const EMAIL_SEND_OUT = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})


module.exports = async(req, res) => {   // to export functions, objects, or variables from one file so they can be imported and used in other files
    if(req.method !== 'POST') {
        return res.status(405).send('METHOD IS NOT ALLOWED')};

        const { emailTo, emailSubject, emailText } = req.body;
         const UserEmailData = {
        from: process.env.EMAIL_USER,
        to: emailTo,
        subject: emailSubject,
        text: emailText
    }

    try {
        await EMAIL_SEND_OUT.sendMail(UserEmailData)
        return res.status(200).send('Email was sent successfully')
    }catch(error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Email was not sent successfully');
    }

}

    


