import React , {useState , useEffect} from 'react'
import './App.css';
import Video from './Video';
import axios from "./axios.js"

function App() {

  const [videos,setVideos] = useState([])
  console.log(videos)
  useEffect(() =>
  {
    async function fetchPosts(){
      const response  = await axios.get("/v2/posts")
      setVideos(response.data)
      console.log(videos)
    }
    fetchPosts()
  },[])

  return (
    <div className="App">
      <div className='app_videos'>
        {videos.map(
          ({ url, channel, description, song, likes, messages, shares }) => (
            <Video
              url={url}
              channel={channel}
              song={song}
              likes={likes}
              messages={messages}
              description={description}
              shares={shares}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
