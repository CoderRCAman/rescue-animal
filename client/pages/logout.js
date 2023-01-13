import React from 'react'
import axios from '../axios'
export default function logout() {
  return (
      <div className='flex justify-center items-center h-screen'>

          <button className='text-white bg-red-500 p-3 rounded-md'
          onClick={()=>{axios.get('/user/logout')}}
          
          >Logout</button>
      </div>
  )
}
