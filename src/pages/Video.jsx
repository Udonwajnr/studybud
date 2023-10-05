import React from 'react'
import { useState } from 'react'
import VideoRoom from '../components/VideoRoom'
const Video = () => {
    const [joined,setJoined] = useState(false)

    return (
        <div className='bg-[#a7bcff]'>
            <h1 className='text-3xl text-center font-bold text-white'>Study ChatRoom</h1>
            <div className='flex flex-col justify-center items-center bg-[#a7bcff] h-screen overflow-hidden'>
            {!joined && (
            <button onClick={()=>setJoined(true)} className="bg-blue-400 text-white p-2 block w-52 h-52 rounded-full text-4xl font-bold">
                Join Room
            </button>
            )}
            {
            joined &&(
                <VideoRoom/>
            )
            }
            </div>     
        </div>
  )
}

export default Video