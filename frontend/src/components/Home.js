import React, { useEffect } from 'react'
import AuthService from '../services/auth.service'
import { Link, NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className='px-5 py-32 flex flex-col items-center'>
      <h1 className='text-3xl'>Gym and Workout Progress Tracking</h1>
      <p className='my-3 text-xl'>Take notes and track your progress!!</p>
      { !(typeof AuthService.getUserId() === "string") ?
      (
        <>
          <Link to="/login" className="text-xl border-2 px-20 border-black">Log In</Link>
        </>
      ) : (
        <>
          <Link to="/main" className='text-xl border-2 px-20 border-black'>Main</Link>
        </>
      )}
    </div>
  )
}

export default Home