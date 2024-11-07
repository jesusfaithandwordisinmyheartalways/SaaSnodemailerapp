

import React from 'react'
import styles from '../components/home/home.module.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';



const Home:React.FC = () => {
    const [emailTo, setEmailTo] = useState<string>('')
    const [emailSubject, setEmailSubject] = useState<string>('')
    const [emailText, setEmailText] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const inputLoginRef = useRef<HTMLInputElement>(null)   // Define the ref with the type HTMLInputElement


    const UserSendEmail = async (e:React.FormEvent) => {
            e.preventDefault()
            try {
                const response = await fetch(`/backend/api/submit.js`, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ emailTo, emailSubject, emailText })
                });
                    if(response.ok) {
                        setMessage('User Response Email has been sent')
                        setEmailTo('')
                        setEmailSubject('')
                        setEmailText('')
                    } else {
                        setMessage('Email has not been sent')
                    }
                 }catch(error) {
                    console.error('error has occurred', error)
                    setMessage('Email has not been sent')
            }
    }


    // Focus on the "login" input field when the component mounts
       useEffect(() => {
          if(inputLoginRef.current) {
            inputLoginRef.current.focus();
          }
       }, [])


       useEffect(() => {
          document.body.classList.add(styles['homepagebackground']);
          return() => {
             document.body.classList.remove(styles['homepagebackground'])
          }
       }, [])

    
  return (
   <>

        <div className={styles.container}>
            <div className={styles.header}><h3>Send A Friend an Email</h3></div>
            <form className={styles.form}  onSubmit={UserSendEmail} name='formLogin' id='formLogin'>
                <div className={styles.label}><label htmlFor='email-subject'>Email Subject</label></div>
                <div><input style={{textAlign: 'center', padding: '1em 2em'}} ref={inputLoginRef} className={styles.message} onChange={(e) => setEmailSubject(e.target.value)} type='text' name="login" value={emailSubject} placeholder='Subject Line' required></input></div>
                <div className='message'><label htmlFor='email-friend'>Friend Email</label></div>
                <div><input style={{textAlign: 'center', padding:'1em 0.9em'}} onChange={(e) => setEmailTo(e.target.value)} type='email' value={emailTo} placeholder='Friend Email' required></input></div>
                <div className='message'><label htmlFor='email-message'>Message</label></div>
                <div><textarea style={{textAlign: 'center'}} onChange={(e) => setEmailText(e.target.value)} cols={30} rows={3} value={emailText} placeholder='Message' required></textarea></div>
                   <div className={styles.button}> <button style={{color:'black', padding:'0.5em 0.9em', border: 'none', fontSize: '1rem', fontFamily: 'times new roman'}} type='submit'>Send Email</button></div>
            </form>
        </div>
            
            <br />
            
            <div>
                {message && <p>{message}</p>}
            </div>


   
   </>
  )
}



export default Home
