  import React, { useState, useEffect} from 'react'
  import { Button, Icon } from 'semantic-ui-react'
  import LoggedIn from './LoggedIn';
  import "../css/Login2.css"

  const Login2 = (props) => {
    const [token, setToken] = useState("");
    const title = "Spotify Sync"
    const description = "A tool to improve playlist workflow"

    const authEndpoint = 'https://accounts.spotify.com/authorize'
    const clientId = "17408cc434f747328134b49f33eb23f9"
    const redirectUri = "http://localhost:3000"
    const responseType = "token"
    const scopes = [
      "user-top-read",
        "user-read-private",
        "user-library-modify",
        "playlist-modify-public",
        "playlist-modify-private",
        "playlist-read-private",
        "user-read-playback-state",
        "user-read-currently-playing"

    ]

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            // window.location.hash = ""
            // window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    console.log(scopes)
    if (!token) {
      return (
          <div className='Login'>
            <h1>{title}</h1>
            <p>{description}</p>
      
            <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=${responseType}`}>
              <Button style={{color:'#1DB954'}}><Icon name='spotify'/>Login
                to Spotify</Button>
              </a>   
          </div>
      )
    }

    else {
      return (
        <LoggedIn setToken={setToken} tok={token}/>
      )
    }
  }

  export default Login2