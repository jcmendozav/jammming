import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar'
import SearchResults from '../../Components/SearchResults/SearchResults'
import Playlist from '../../Components/Playlist/Playlist'
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []

    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks.slice();
    const result = tracks.findIndex(t => t.id === track.id);
    if (result < 0) {
      tracks.push(track);
      this.setState({
        playlistTracks: tracks
      })
    }
    // if(result && result.length>0)
  }

  removeTrack(track) {
    const tracks = this.state.playlistTracks.slice();
    // const result = tracks.filter(t=>t.id!=track.id);
    this.setState({
      playlistTracks: tracks.filter(t => t.id != track.id)
    });

  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    });
  }

  savePlayList(){
    const trackURIs = this.state.playlistTracks.map(t=>t.uri);
    Spotify.savePlayList(this.state.playlistName, trackURIs)
    .then(()=>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search(term){
    // console.log(`term: ${term}`);
    Spotify.search(term).then(
      searchResults=>{
        this.setState({
          searchResults: searchResults
        })
      }
    )
  }
  render() {
    return (<div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          {/* <!-- Add a Playlist component --> */}
          <SearchResults 
          searchResults={this.state.searchResults} 
          onAdd={this.addTrack} 
          />
          <Playlist 
          playlistTracks={this.state.playlistTracks} 
          playlistName={this.state.playlistName} 
          onRemove={this.removeTrack} 
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlayList}
          />
        </div>
      </div>
    </div>
    );
  }

}

export default App;
