import React from 'react'
import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect,useState } from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import { VideoPlayer } from './VideoPlayer';

const APP_ID = "db9b4ae7ea08420b983e6a324286af30"; //ENTER APP ID HERE
const TOKEN  = '007eJxTYDCaney/lOdy4dX+yX7hu9xSsi9U3iw/dld6mb7p0r6vKjcUGFKSLJNMElPNUxMNLEyMDJIsLYxTzRKNjUyMLMwS04wNmtXkUxsCGRkEq2+xMDJAIIjPwpCbmJnHwAAAbTYfSA==';
const CHANNEL = "main"
const client = AgoraRTC.createClient({mode:"rtc",codec:"vp8"})


const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    const [toggleMicBoolean,setToggleMicBoolean] = useState(false)
    const [toggleMicCamera,setToggleMicCamera] = useState(false)
    const [leave,setLeave] = useState(false)
    const handleUserJoined = async (user, mediaType) => {
      await client.subscribe(user, mediaType);
  
      if (mediaType === 'video') {
        setUsers((previousUsers) => [...previousUsers, user]);
      }
  
      if (mediaType === 'audio') {
        user.audioTrack.play()
      }
    };

    const leaveAndRemoveLocalStream =async()=>{
        for(let i = 0; localTracks.length > i; i++){
            localTracks[i].stop()
            localTracks[i].close()
        }
    
        await client.leave()
        setLeave(true)
    }
  
    const handleUserLeft = (user) => {
      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.uid !== user.uid)
      );
    };
    
    const toggleCamera =async()=>{
        if(localTracks[1].muted){
            await localTracks[1].setMuted(false)
            setToggleMicCamera(false)
        }
        else{
            await localTracks[1].setMuted(true)
            setToggleMicCamera(true)
        }
    }


    const toggleMic =async(e)=>{
        if(localTracks[0].muted){
            await localTracks[0].setMuted(false)
            setToggleMicBoolean(false)
        }
        else{
            await localTracks[0].setMuted(true)
            setToggleMicBoolean(true)
        }
    }
  
    useEffect(() => {
      client.on('user-published', handleUserJoined);
      client.on('user-left', handleUserLeft);
  
      client
        .join(APP_ID, CHANNEL, TOKEN, null)
        .then((uid) =>
          Promise.all([
            AgoraRTC.createMicrophoneAndCameraTracks(),
            uid,
          ])
        )
        .then(([tracks, uid]) => {
          const [audioTrack, videoTrack] = tracks;
          
          setLocalTracks(tracks);
          setUsers((previousUsers) => [
            ...previousUsers,
            {
              uid,
              videoTrack,
              audioTrack,
            },
          ]);
          client.publish(tracks);
        });
  
      return () => {
        for (let localTrack of localTracks) {
          localTrack.stop();
          localTrack.close();
        }
        client.off('user-published', handleUserJoined);
        client.off('user-left', handleUserLeft);
        client.unpublish(localTracks).then(() => client.leave());
      };
    }, []);

    return (
    <div style={{display:'flex',flexDirection:'column'}} className=' p-2 w-full'>
        {
        !leave?
        <>
        <div className='h-[90vh] w-full bg-slate-500 overflow-hidden'
            style={{display:"grid",
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))'
                }}
        >
        { users.map((user) => (
            <VideoPlayer key={user.uid} user={user} toggleCamera={toggleCamera} toggleMic={toggleMic}/>
        ))}

        
        </div>
        <div id='stream-control' className=' w-full'
         style={{display:"flex",
                justifyContent:"center",
        }}
         >
            <button onClick={leaveAndRemoveLocalStream} className='p-2' style={{border:"none",
                    backgroundColor: "red",
                    color:"#fff",
                    fontSize:"16px",
                    margin:"2px",
                    cursor: "pointer"}}>Leave Stream</button>
            {
                toggleMicBoolean?
                <button className='p-2' onClick={toggleMic} style={{border:"none",
                backgroundColor: "cadetblue",
                color:"#fff",
                // padding:"10px 20px",
                fontSize:"16px",
                margin:"2px",
                cursor: "pointer"}}>Mic On</button>
                :
                <button className='p-2' onClick={toggleMic}
                    style={{border:"none",
                    backgroundColor: "red",
                    color:"#fff",
                    fontSize:"16px",
                    margin:"2px",
                    cursor: "pointer"
                }}
                >Mic off</button>
            }
            {
                toggleMicCamera?
                <button onClick={toggleCamera}
                style={{border:"none",
                backgroundColor: "cadetblue",
                color:"#fff",
                padding:"10px 20px",
                fontSize:"16px",
                margin:"2px",
                cursor: "pointer"}}
                >Camera On</button>
                :
                <button
                 onClick={toggleCamera}
                 style={{border:"none",
                 backgroundColor: "red",
                 color:"#fff",
                 padding:"10px 20px",
                 fontSize:"16px",
                 margin:"2px",
                 cursor: "pointer"}}
                >Camera Off</button>
            }
        </div>
        </>
            :
        <h1 className='text-white font-bold text-4xl text-center'>You Left the group.</h1>
        
        }    
  </div>
  )
}

export default VideoRoom