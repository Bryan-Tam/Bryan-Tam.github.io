import React, { useState, useEffect} from 'react'
import { Button, Icon, Menu } from 'semantic-ui-react'
import SpotifyWebApi from 'spotify-web-api-js';
import '../css/LoggedIn.css';
import { Route, Routes, NavLink, BrowserRouter } from 'react-router-dom';

import Playlists from './Playlists';
import Top from './Top';

const spotifyApi = new SpotifyWebApi;

const LoggedIn = (props) => {
  const [name, setName] = useState('')

  useEffect(() => {
    spotifyApi.setAccessToken(props.tok)
    spotifyApi.getMe().then((data) => setName(data.display_name))
    // updatePlaylists()
  }, [])

  const logout = () => {
    props.setToken("")
    window.localStorage.removeItem("token")
  }

  

  // const loadTracks = (id) => {
  //   let ptrack = pList.find(item => item.id == id)
  //   console.log("LOADTRACK")
  //   let listItems = []
  //   spotifyApi.getPlaylistTracks(ptrack.id).then(data => setSelectedPList(data.items))
  //   spotifyApi.getPlaylistTracks(ptrack.id).then(function (data) {
  //     console.log(data)
  //     listItems = data
  //     console.log(listItems)
  //   },
  //   function (err) {
  //     console.error(err)
  //   })

    // spotifyApi.getPlaylistTracks(ptrack, {limit : 100}).then(data => console.log(data.items))
    // let i = 0
    // while (ptrack.tracks.total > i) {
    //   i+= 100
    //   spotifyApi.getPlaylistTracks(ptrack.id, {limit: 100, offset:i}).then(data => setSelectedPList(data.items))
    // }
  // }

  return (
    <BrowserRouter>
      <div>
          <div className='Menu'>
            <NavLink to="/"><h2 style={{float:'left', margin:"0 1em", color:"#1DB954"}}>{name}</h2></NavLink>
            <NavLink to="/playlists"><Button inverted style={{float:'left', margin:'0'}}>Playlists</Button></NavLink>
            <NavLink to="/top"><Button inverted>Top</Button></NavLink>
            <NavLink to="/"><Button onClick={logout} style={{float:'right', margin:'0'}}>Logout</Button></NavLink>
          </div>
        {/* <Playlists pn={pListNames} sPList={selectedPList}/> */}
        {/* {pListNames} */}
        <Routes>
            <Route path="/" element={null}/>
            <Route path="/playlists" element={<Playlists api={spotifyApi}/>}/>
            <Route path="/top" element={<Top api={spotifyApi}/>} />
          </Routes>
      </div>
      </BrowserRouter>
  )
}

export default LoggedIn