import React from  'react';
import './Playlist.css';
import TrackList from '../../Components/TrackList/TrackList';

class Playlist extends React.Component{

  constructor(props){
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this);
  }
  handleNameChange(event){
    const newName = event.target.value;
    this.props.onNameChange(newName);
  }
    render(){
        // const defaultValue = {'New Playlist'};
        // console.log(`playlist: ${JSON.stringify(this.props)}`);
        return (<div className="Playlist">
        <input 
        // defaultValue={this.props.playlistName} 
        value={this.props.playlistName} 
        onChange={this.handleNameChange}/>
        {/* <!-- Add a TrackList component --> */}
        <TrackList tracks={this.props.playlistTracks}  onRemove={this.props.onRemove} isRemoval={true}/>
        <button className="Playlist-save"
        onClick={this.props.onSave}
        >SAVE TO SPOTIFY</button>
      </div>);
    }
}

export default Playlist;