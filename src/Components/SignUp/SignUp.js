import React, { useState } from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import LoginSignupImage from '../../images/login-animation.gif'

// to handle password icons show and hide 
const Signup = () => {

  // for navigate our page using hook 
  const navigate = useNavigate()
  //for password
  const [showPassword, setShowPassword] = useState(false)
  //for Confirm password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  //for handle input value
  const [data, setData] = useState({

    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: ""
  })
  console.log(data)


  const [blankFieldsError, setBlankFieldsError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleShowPassword = () => {

    setShowPassword(preve => !preve)
  }

  const handleConfirmShowPassword = () => {

    setShowConfirmPassword(preve => !preve)

  }

  // to access your inputs value
  const handleOnChange = (e) => {

    const { name, value } = e.target
    setData((preve) => {

      return {
        ...preve,
        [name]: value
      }
    })
  }

  //to uploaad your profile image 

  //password is checked similer using if else condition
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const{firstname,email,password,confirmpassword} = data
  //   if(firstname && email && password && confirmpassword){

  //     if(password === confirmpassword){
  //       alert('Successfull')
  //       navigate('/login')

  //     }
  //     else{
  //       alert('Password Not Match')
  //     }

  //   }
  //   else{
  //     alert('Please fill require fields')
  //   }
  // }


  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:7000/api/users?email=${email}`);
  
      if (response.ok) {
        const data = await response.json();
        return data.exists; // Assumes the response contains a field 'exists' for email
      } else {
        // Handle API error
        console.error('Email check failed.');
        return false;
      }
    } catch (error) {
      console.error('API request error:', error);
      return false;
    }
  };
  
  const checkPasswordExists = async (password) => {
    try {
      const response = await fetch(`http://localhost:7000/api/users?password=${password}`);
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        return data.exists; // Assumes the response contains a field 'exists' for password
       
      } else {
        // Handle API error
        console.error('Password check failed.');
        return false;
      }
    } catch (error) {
      console.error('API request error:', error);
      return false;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, confirmpassword } = data;

    if (!firstname || !lastname || !email || !password || !confirmpassword) {
      setBlankFieldsError('All fields are required.');
      setEmailError('');
      setPasswordError('');
      return;
    }

    if (password === confirmpassword) {
      setBlankFieldsError('');

      const isEmailExists = await checkEmailExists(email);
      if (isEmailExists) {
        setEmailError('Email is already registered. Choose a different email.');
        setPasswordError('');
        return;
      }

      const isPasswordExists = await checkPasswordExists(password);
      if (isPasswordExists) {
        setPasswordError('Password is not unique. Choose a different password.');
        setEmailError('');
        return;
      }

      // Continue with registration if both email and password are unique
      // Prepare the data to be sent to the API for registration
      const userData = {
        user_Name: firstname + ' ' + lastname,
        email,
        password,
      };

      try {
        // Replace this with your API endpoint for user registration
        const registrationResponse = await fetch('http://localhost:7000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (registrationResponse.ok) {
          alert('Data added successfully!');
          setData({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
          });
          navigate('/');
        } else {
          alert('Failed to register user. Please try again.');
        }
      } catch (error) {
        console.error('API request error:', error);
        alert('Failed to register user. Please try again.');
      }
    } else {
      setPasswordError('Password does not match.');
      setEmailError('');
    }
  };
  return (

    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm  bg-white m-auto flex  flex-col p-4'>
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
          <img src={data.image ? data.image : LoginSignupImage} className='w-full h-full' alt='userlogo' />


        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
        {blankFieldsError && <p className="text-red-500 text-sm mt-2 text-center">{blankFieldsError}</p>}
          <label for="name">First Name</label>
          <input type='text' id='firstname' name='firstname' className='mb-2 mt-1 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.firstname}
            onChange={handleOnChange}

          />

          <label for="lastname">Last Name</label>
          <input type='text' id='lastname' name='lastname' className='mb-2 mt-1 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.lastname}
            onChange={handleOnChange}

          />

          <label for="email">Email</label>
          <input type='email' id='email' name='email' className='mb-2 mt-1 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.email}
            onChange={handleOnChange}
          />
          {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}

          <label for="password">Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mb-2 mt-1 focus-within:outline focus-within:outline-blue-300'>
            <input type={showPassword ? "text" : 'password'} id='password' name='password' className=' w-full bg-slate-200 border-none outline-none '
              value={data.password}
              onChange={handleOnChange}
            />
            {/* using ternary operator ? for onclick hide and show  */}
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <VscEye /> : <VscEyeClosed />}</span>
          </div>


          <label for="confirmpassword">Confirm Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mb-2 mt-1 focus-within:outline focus-within:outline-blue-300'>
            <input type={showConfirmPassword ? "text" : 'password'} id='confirmpassword' name='confirmpassword' className=' w-full bg-slate-200  border-none outline-none '
              value={data.confirmpassword}
              onChange={handleOnChange}
            />
            {/* using ternary operator ? for onclick hide and show  */}
            <span className='flex text-xl cursor-pointer' onClick={handleConfirmShowPassword}>{showConfirmPassword ? <VscEye /> : <VscEyeClosed />}</span>
          </div>
          {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>} {/* Display password error below password field */}

          <button className='w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign Up</button>

        </form>
        <p className='text-left text-sm mt-2'>Already have an account ? <Link to={'/'} className='text-red-500 underline'>Login</Link></p>
      </div>
    </div>
  )
}

export default Signup