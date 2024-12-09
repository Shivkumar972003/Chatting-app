import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[600px] rounded-lg bg-gray-400 overflow-hidden text-zinc-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '> 
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage
