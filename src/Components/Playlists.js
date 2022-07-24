import React, {useEffect, useState} from "react"
import { Button, Table } from "semantic-ui-react"

const Playlists = (props) => {
  const [uid, setUid] = useState()
  const [pList, setPList] = useState([])  // playlists objects
  const [pListNames, setPListNames] = useState()  // playlists as buttons w/name
  const [selectedPList, setSelectedPList] = useState([])
  const [selectedPListID, setSelectedPListID] = useState("")

  useEffect(() => {
    updatePlaylists()
    props.api.getMe().then(data => setUid(data.id))
  },[])

  useEffect(() => { // updates the playlist buttons in state
    if (pList) {
      const tmp = pList.map(it => <Button style={{background: it.id==selectedPListID ? "green" : "white"}} onClick={() => loadTracks(it.id)}>{it.name} - {it.tracks.total}</Button>)
      // console.log(temp2)
      setPListNames(tmp)
    }
  }, [pList, selectedPListID])
  
  const updatePlaylists = () => {
    props.api.getUserPlaylists({limit:50})
    .then((data) => setPList(data.items))
    props.api.getUserPlaylists({limit:50})
    .then((data) => console.log(data.items))
  }

  
  const loadTracks = (id) => {
    let playlist = pList.find(item => item.id == id)
    console.log("LOADTRACK - " + playlist.name)
    
    setSelectedPListID(playlist.id)
    props.api.getPlaylistTracks(playlist.id).then(data => setSelectedPList(data.items))

    // let i = 0
    // while (ptrack.tracks.total > i) {
    //   i+= 100
    //   spotifyApi.getPlaylistTracks(ptrack.id, {limit: 100, offset:i}).then(data => setSelectedPList(data.items))
    // }
  }

  return (
    <div className="Page">
      <h1>Playlists</h1>
      {pListNames}
      <Table structured>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Artist</Table.HeaderCell>
          <Table.HeaderCell>Album</Table.HeaderCell>
          <Table.HeaderCell>Date Added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {selectedPList.map(data => <Table.Row>
            <Table.Cell>{data.track.name}</Table.Cell>
            <Table.Cell>{data.track.artists[0].name}</Table.Cell>
            <Table.Cell>{data.track.album.name}</Table.Cell>
            <Table.Cell>{data.added_at}</Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
      <div style={{textAlign:'left'}}>
      </div>
    </div>
  )
}

export default Playlists