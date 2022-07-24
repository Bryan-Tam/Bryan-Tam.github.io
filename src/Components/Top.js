import { useEffect, useState } from "react"
import { Checkbox } from "semantic-ui-react"
import "../css/Top.css"

const Top = (props) => {
  const [topArtists, setTopArtists] = useState([])
  const [topTracks, setTopTracks] = useState([])
  const [slider, setSlider] = useState(true)

  useEffect(() => {
    console.log("initial")
    props.api.getMyTopArtists().then(data => setTopArtists(data.items))
    props.api.getMyTopTracks().then(data => setTopTracks(data.items))
    // props.api.getMyTopArtists().then(data => console.log(data))
  }, [])
  // const topArtists = props.api.getMyTopArtists().then(data => console.log(data))

  return (
    <div className="Page">
      <div style={{justifyContent:"center", textAlign:"center"}}>Top Artists <Checkbox slider style={{}} onChange={() => setSlider(!slider)}/> Top Tracks</div>
      { slider ?
      topArtists.map((data, i) => <p style={{fontSize:60-(i*2.5), margin:0, padding:0}}>{i+1}. {data.name}</p>)
      :
      topTracks.map((data, i) => <p style={{fontSize:60-(i*2.5), margin:0, padding:0}}>{i+1}. {data.name}</p>)
      }
    </div>
  )
}

export default Top