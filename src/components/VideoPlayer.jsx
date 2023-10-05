import React, { useEffect, useRef } from 'react';

export const VideoPlayer = ({ user,toggleCamera,toggleMic }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);

  return (
    <>
      {/* Uid: {user.uid} */}
      <div className='w-full h-full border-2'
        ref={ref}
        style={{
        border:" 2px solid black",
    }}     
   >
      </div>    
    </>

       
  );
};
