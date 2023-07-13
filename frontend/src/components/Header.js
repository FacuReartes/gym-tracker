import React, { useEffect, useState } from 'react'
import AuthService from '../services/auth.service'

function Header() {
  return (
    <div className='bg-red-300 flex items-center justify-center flex-col'>
      <h1 className='text-4xl font-bold p-5'>Test</h1>
      <p className='text-xl font-bold p-2'>Bienvenido {AuthService.getUser()}</p>
    </div>
  )
}

export default Header