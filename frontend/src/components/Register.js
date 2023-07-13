import { React, useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import AuthService from '../services/auth.service'

const REGEX = /^.{5,30}$/

function Register() {

  const { setAuth } = useContext(AuthContext)

  const [success, setSuccess] = useState(false)

  const [errMsg, setErrMsg] = useState("")

  const [user, setUser] = useState("")
  const [validUser, setValidUser] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [cfmPassword, setCfmPassword] = useState("")
  const [validCfmPassword, setValidCfmPassword] = useState(false)
  const [passwordCmfFocus, setPasswordCfmFocus] = useState(false)

  useEffect(() => {
    setValidUser(REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidPassword(REGEX.test(password));
    setValidCfmPassword(password === cfmPassword);
  }, [password, cfmPassword])
  
  const handleRegister = async (e) => {
    e.preventDefault();
    await AuthService.signup(user, password, setErrMsg, setSuccess)
    setUser("");
    setPassword("");
    setCfmPassword("");
  }

  return (
    <div className='bg-gray-100 mx-5 my-32 border-2 border-black px-8'>

      {success ? (
      <>
        <h1 className='font-bold text-2xl py-2'>Successfully Registered!</h1>
        <p className='pb-2'>Go to <NavLink to='/login' className='text-blue-500 underline'>Login</NavLink></p>
      </>
      ) : (
      <>
        <h1 className='py-4 text-3xl font-bold'>Register</h1>
        <form onSubmit={handleRegister}>

          {/* Username */}     
          <div className='mb-3'>
            <input type='text' placeholder='Username' value={user} autoFocus required autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className={`outline-0 px-2 rounded-xl w-full border-2 ${userFocus && (validUser ? 'border-green-200' : 'border-red-300')}`}></input>
            {userFocus && !validUser &&
            <p className='px-2 text-sm text-red-500'>Between 5 and 30 length</p> }
          </div>

          {/* Password */}
          <div className='mb-3'>
            <input type='text' placeholder='Password' value={password} autoFocus required autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            className={`outline-0 px-2 rounded-xl w-full border-2 ${passwordFocus && (validPassword ? 'border-green-200' : 'border-red-300')}`}></input>
            {passwordFocus && !validPassword &&
            <p className='px-2 text-sm text-red-500'>Between 5 and 30 length</p> }
          </div>

          {/* Password Confirmation */}
          <div className='mb-3'>
            <input type='text' placeholder='Confirm Password' value={cfmPassword} autoFocus required autoComplete="off"
            onChange={(e) => setCfmPassword(e.target.value)}
            onFocus={() => setPasswordCfmFocus(true)}
            onBlur={() => setPasswordCfmFocus(false)}
            className={`outline-0 px-2 rounded-xl w-full border-2 ${passwordCmfFocus && (validCfmPassword ? 'border-green-200' : 'border-red-300')}`}></input>
            {passwordCmfFocus && !validCfmPassword &&
            <p className='px-2 text-sm text-red-500'>Must match password</p> }
          </div>

          <button type="submit" disabled={validUser && validPassword && validCfmPassword ? false : true}
          className='disabled:bg-gray-400 disabled:opacity-50 rounded-xl bg-red-400 text-black border-black font-bold w-full mb-3 border-2 duration-500'>Sign Up</button>
        </form>
        {errMsg.length > 0 && <h1 className='mb-1 text-red-500'>{errMsg}</h1>}
      </>
      )}
    </div>
  )
}

export default Register