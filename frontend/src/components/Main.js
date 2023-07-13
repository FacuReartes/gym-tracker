import { React, useEffect, useState } from 'react'
import { categoriesService } from '../services/categories.service';
import Categorie from './Categorie';

function Main() {

  const [cat, setCat] = useState(null);

  async function BuscarPorId(num) {
    const data = await categoriesService.BuscarPorId(num);
    setCat(data);
    console.log(data)
  }

  useEffect(() => {
    BuscarPorId(sessionStorage.getItem("idUser"))
  }, [])

  let categorieComponent = null
  if (cat) {
    categorieComponent = cat.map(x => (
      <div key={x.IdCategory} className=''>
        <Categorie name={x.Name} key={x.IdCategory} desc={x.Description}/>
      </div>
  ))}

  return (
    <div className=''>
      <div className='grid grid-cols-2 border-2 border-black m-2 p-2 gap-2'>
        {cat && categorieComponent}
      </div>
    </div>
  )
}

export default Main