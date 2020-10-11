import React from 'react';
import './TrackList';
import Track from '../../Components/Track/Track';

class TrackList extends React.Component{
    render(){
        // console.log(`tracks: ${JSON.stringify(this.props)}`);
        return (<div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        {this.props.tracks && this.props.tracks.map((track)=>{
            return (<Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />);
        })}
    </div>);
    }
}

export default TrackList;