

require('dotenv').config({path: '/backend/config/.env'})
const nodemailer = require('nodemailer')


module.exports = async(req, res) => {   // to export functions, objects, or variables from one file so they can be imported and used in other files
    if(req.method == 'POST') {
        const { emailTo, emailSubject, emailText } = req.body;

        const EMAIL_SEND_OUT = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const UserEmailData = {
            from: process.env.EMAIL_USER,
            to: emailTo,
            subject: emailSubject,
            text: emailText
        }

        try {
            await EMAIL_SEND_OUT.sendMail(UserEmailData)
            return res.status(200).json({message: 'Email was sent successfully'})
        }catch(error) {
            console.error('Error sending email:', error);
            return res.status(500).json({error: 'failed to send email' })
        }
    } else {
        res.status(405).json({error: 'method not allowed'})
    }
   
}

    


