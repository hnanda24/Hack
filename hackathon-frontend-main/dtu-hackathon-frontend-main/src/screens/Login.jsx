import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import { useRecoilState } from 'recoil'
import axios from 'axios'
// const url = 'http://localhost:5000/api/auth'
// import { authState } from '../state/atoms/AuthState'
const formInputs = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'example@example.com',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
]

const Login = () => {


  const navigate = useNavigate()
  const [formData, setformData] = useState({
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setformData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`http://localhost:3000/user/login`, formData)

      const { data } = response;

      if (data.token) {
        localStorage.setItem('auth_token', `${data.token}`)
        navigate('/events')
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      // console.log()
      console.log('login try catch error');
      console.log('Error: ', error);
    }
  }

  async function tokenLogin(){
    try{
      let response = await axios.post('http://localhost:3000/user/login',{
        headers:{
          'auth': localStorage.getItem('auth_token')
        }
      })
      
      if(response.status === 401){
        setMessage("Error Loggin In");
      }else if(response.status === 200){
        navigate('/events');
      }else{
        console.log('error in tokenlogin after response.status 200');
      }
    }catch(err){
      console.log('try catch error in token login');
      console.log('Error: ' + err);
    }

  }

  useEffect(()=>{
    if(localStorage.getItem('auth_token')){
      tokenLogin();
    }
  })

  return (
    <div className='flex items-center justify-center mt-4'>
      <div className='flex flex-col items-center justify-center gap-8 px-8 py-10 bg-white rounded-lg shadow-lg '>
        <div className='flex flex-col items-center justify-center gap-2 px-14'>
          <h2 className='text-4xl font-bold'>Sign In</h2>
          <p className='text-lg font-semibold text-center text-slate-400'>
            Enter your credentials to access your <br />
            account
          </p>
          {message ? 
            <p className='text-red-600 bg-red-200 rounded-md border-2 border-solid border-red-500 p-0 px-10 '>{message}</p>
            : <p></p>}
        </div>

        <form
          className='flex flex-col w-full gap-8'
          onSubmit={handleSubmit}
        >
          {formInputs.map((elem) => {
            return (
              <div
                key={elem.name}
                className='flex flex-col gap-1'
              >
                <label className='text-lg font-bold'>{elem.label}</label>
                <input
                  className='px-2 py-3 rounded-md shadow-md text-md'
                  value={formData[elem.name]}
                  type={elem.type}
                  placeholder={elem.placeholder}
                  name={elem.name}
                  onChange={handleChange}
                />
              </div>
            )
          })}
          <button
            type='submit'
            className='py-3 font-bold text-white rounded-md bg-slate-950 hover:bg-slate-700'
          >
            Sign In
          </button>
        </form>

        <h3 className='text-lg font-semibold'>
          Don't have an account?{' '}
          <Link
            className='font-bold underline'
            to={'/signin'}
          >
            Signup
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default Login