import React, { useState} from 'react'
import { Button, Icon } from 'semantic-ui-react'
import Login2 from './Login2';
import LoggedIn from './LoggedIn';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi;
const title = "Spotify Sync"
const description = "A tool to improve playlist workflow"

const authEndpoint = 'https://accounts.spotify.com/authorize'
const clientId = "17408cc434f747328134b49f33eb23f9"
const redirectUri = "http://localhost:3000"
const scopes = [
    "user-read-private",
    "user-library-modify",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "user-read-playback-state",
    "user-read-currently-playing"

]

const hash = window.location.hash
.substring(1)
.split("&")
.reduce(function(initial, item) {
  if (item) {
    var parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = "";

console.log(hash)
let _token = hash.access_token;

class Main extends React.Component {
  constructor() {
    super();
      this.state = {
        token: null,
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: ""}],
          duration_ms:0,
        },
        is_playing: "Paused",
        progress_ms: 0
      }

    this.getHashParams = this.getHashParams.bind(this)
    this.getNowPlaying = this.getNowPlaying.bind(this)
  }

  getHashParams() {
    console.log("*HASHING")
    const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = "";
    return hash
  }

  /*getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }*/

  getNowPlaying() {
    spotifyApi.setAccessToken(_token)
    spotifyApi.getMe()
    .then((data) =>
      console.log(data))

    spotifyApi.getMyCurrentPlayingTrack()
    .then((response) => {
      console.log("Playback")
      console.log(response)
      /*this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.albumArt.images[0].url
        }
      })*/
    })
  }
  
  //const tok = hash.access_token;
  //const [token, setToken] = useState();


  render() {
    return (
        <div>
            <div>
        <h1>{title}</h1>
        <p>{description}</p>
        {console.log(_token)}
        <Button onClick={() => console.log("CLIKED LOG")}>
            <Icon name='spotify'/>
            {!_token ? <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
            Login
            </a>
            :
            <h2>Welcome</h2>
            }
        </Button>
        <Button label="set true" onClick={this.getNowPlaying}/>
      </div>
        </div>
    )
  }

}

export default Main