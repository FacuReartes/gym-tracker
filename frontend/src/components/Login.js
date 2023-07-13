import { React, useState, useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import AuthService from '../services/auth.service'

const REGEX = /^.{5,30}$/

function Login() {

  const { setAuth } = useContext(AuthContext)

  const [errMsg, setErrMsg] = useState("")

  const [flag, setFlag] = useState(false)

  const [user, setUser] = useState("")
  const [validUser, setValidUser] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  useEffect(() => {
    setValidUser(REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidPassword(REGEX.test(password));
  }, [password])

  const navigate = useNavigate();

  const navigateToComponent = () => {
    navigate(`/inicio`)
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    await AuthService.login(user, password, navigateToComponent, setErrMsg)
    if(!AuthService.getUserId()) {
      setFlag(true)
      setUser("")
      setPassword("")
    }
  }

  useEffect(() => {
    AuthService.logout()
  }, [])

  return (
    <div className='bg-gray-100 mx-5 my-32 border-2 border-black px-8'>
      <h1 className='py-4 text-3xl font-bold'>Login</h1>
      <form onSubmit={handleLogin}>

        {/* Username */}
        <div className='mb-3'>
          <input type='text' placeholder='Username' value={user} autoFocus required autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          className={`outline-0 px-2 rounded-xl w-full border-2 ${userFocus && !validUser && 'border-red-300'}`}></input>
          {userFocus && !validUser &&
          <p className='px-2 text-sm text-red-500'>Between 5 and 30 length</p> }
        </div>

        {/* Password */}
        <div className='mb-3'>
          <input type='text' placeholder='Password' value={password} autoFocus required autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          className={`outline-0 px-2 rounded-xl w-full border-2 ${passwordFocus && !validPassword && 'border-red-300'}`}></input>
          {passwordFocus && !validPassword &&
          <p className='px-2 text-sm text-red-500'>Between 5 and 30 length</p> }
        </div>


        <button type="submit" 
        className='rounded-xl bg-red-400 text-black font-bold w-full mb-1 border-2'>Log In</button>
      </form>
      <div className='flex justify-end mb-2'>
        <NavLink to="/signup" className='text-blue-500 underline'>Sign up</NavLink>
      </div>
      {errMsg.length > 0 && <h1 className='mb-1'>{errMsg}</h1>}
    </div>
  )
}

export default Login