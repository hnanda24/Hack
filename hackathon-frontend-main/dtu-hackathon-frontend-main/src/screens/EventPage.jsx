import  {  useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {images} from '../assets/data'

import QRCode from 'react-qr-code';

const EventPage = () => {
  const params = useParams();
  const eventId = params.id;

  const [eventDetails, setEventDetails] = useState('');
  const [isSubscribed, setIsSubscribed] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [qr, setQr] = useState("");



  async function getEventDetails(){
    let response = await fetch(`http://localhost:3000/user/getEventDetails/${eventId}`, {
      method: 'GET'
    })
    let data = await response.json();
    console.log(data)
    setEventDetails(data.eventDetails[0]);
  }

  async function subscribeToEvent(){
    let response = await fetch('http://localhost:3000/user/subscribe', {
      method: 'POST',
      headers: {
        'auth': localStorage.getItem('auth_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'eventId': eventId})
    })

    let data = await response.json();
    console.log(data);
    if(response.status === 200){
      setMessage('Subscribed');
      setMessageType('success');
      setTimeout(()=>{
        setMessage('');
        setMessageType('');
      }, 2000)
    }

    if(response.status === 401){
      setMessage('Error subscribing');
      setMessageType('error');

      setTimeout(()=>{
        setMessage('');
        setMessage('');
      }, 2000)
    }
    isSubscribedAlready();
  }

  async function isSubscribedAlready(){
    console.log('here');
    let response = await fetch(`http://localhost:3000/user/userSubscribed/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth': localStorage.getItem('auth_token')
      }
    })

    let data = await response.json();
    console.log(data);
    setIsSubscribed(data.subscribed);
  }

  async function getQR(){
    let response = await fetch(`http://localhost:3000/user/register/qr/${eventId}`, {
      method: 'GET',
      headers: {
        'auth': localStorage.getItem('auth_token')
      }
    })

    let data = await response.json();
    setQr(data.qrcode);
    console.log(data);
  }


  useEffect(()=>{
    getEventDetails();
    isSubscribedAlready();
  }, []);   
  

  return (
    <div className="flex flex-col justify-center items-center h-screen">
    {message && <div>{message}</div>}
    <div className="bg-white pb-8 rounded-lg rounded-b-none shadow-md">
      <div>
        <img src={images[0]} alt={'hello'} className="w-full h-64 object-cover rounded-lg mb-4" />
      </div>
      <div className="text-center px-4 flex flex-col ">
        <h1 className="text-2xl font-bold">{eventDetails.eventName}</h1>
        <p className="mb-2">Description of {eventDetails.eventName}</p>
        <p className="mb-4">Venue of {eventDetails.eventName}</p>
        <div className='flex flex-col gap-2'>
          {isSubscribed ? (
            <button className="bg-gray-400 text-gray-800 px-4 py-2 rounded-lg cursor-not-allowed w-full" disabled>Already Enrolled</button>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full" onClick={subscribeToEvent}>Subscribe</button>
          )}
          {qr ? <QRCode value={qr}/> : <></>}
          {isSubscribed && (
            <button onClick={getQR} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">Get QR</button>
          ) }
        </div>
      </div>
    </div>
  </div>
  )
}

export default EventPage