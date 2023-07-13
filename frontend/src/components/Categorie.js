import React from 'react'

function Categorie(props) {
  return (
    <div className='bg-yellow-100 flex items-center flex-col'>
      <h1 className='text-lg font-bold pt-1'>{props.name}</h1>
      <p className='px-3 pb-2'>{props.desc}</p>
    </div>
  )
}

export default Categorie