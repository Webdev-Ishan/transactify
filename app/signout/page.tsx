"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

function SignOut() {
    const handleLogout = async()=>{
        await signOut({callbackUrl:"/"})
    }
  return (
    <div className='w-full h-full flex justify-center items-center bg-white p-6'>
      <button type="button" onClick={()=>handleLogout()} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logut</button>
    </div>
  )
}

export default SignOut
