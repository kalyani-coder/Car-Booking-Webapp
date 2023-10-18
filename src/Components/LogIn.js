import React, {useState} from 'react'
import {VscEye,VscEyeClosed} from 'react-icons/vsc'
import {Link} from 'react-router-dom'

const Login = () => {
 
  //for password
  const [showPassword, setShowPassword] = useState(false)
  //for handle input value
  const [data, setData] = useState({

    firstname : "",
    lastname : "",
    email : "",
    password : "",
    confirmpassword : ""
  })
  console.log(data)

  const handleShowPassword = () => {

    setShowPassword(preve => !preve)
  }
  
  const handleOnChange = (e) => {

    const {name,value} = e.target
      setData((preve) => {

        return{
          ...preve,
          [name] : value
        }
      })
  }

  //password is checked similer using if else condition
  const handleSubmit = (e) => {
    e.preventDefault()
    const{email,password} = data
    if(email && password){
        alert('Successfull')
        
    }

    else{
      alert('Please fill require fields')
    }

  }

  return (
    
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm  bg-white m-auto flex  flex-col p-4'>
       {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
       <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
        <img src='https://raw.githubusercontent.com/IsAmitprajapati/-Build-a-COMPLETE-Fullstack-ecommerce-Responsive-MERN-App-React-Redux-Nodejs-MongoDB-Express/main/frontend/src/assest/login-animation.gif'className='w-full' alt='userlogo'/>
       </div>

       <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>

          <label for="email">Email</label>
          <input type='email' id='email' name='email' className='mb-2 mt-1 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-300' 
          value={data.email} 
          onChange={handleOnChange}
          />

          <label for="password">Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mb-2 mt-1 focus-within:outline focus-within:outline-blue-300'>
          <input type={showPassword ? "text" :'password'} id='password' name='password' className=' w-full bg-slate-200  border-none outline-none ' 
          value={data.password} 
          onChange={handleOnChange}
          />
          {/* using ternary operator ? for onclick hide and show  */}
          <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <VscEye/> : <VscEyeClosed/>}</span>
          </div>
          
          <button  className='w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Login</button>

       </form>

          <p className='text-left text-sm mt-2'>Don't have an account ? <Link to={'/signup'} className='text-red-500 underline'>Sign Up</Link></p>

      </div>
    </div>

  )
}

export default Login
