
class CurrentSong extends React.Component {
  render(){
  	
  	var currentSong = this.props.currentSong.map(function(s,i){
      // TODO - Figure out how to order these by upvotes minus downvotes
      return (
		<li>
			<div>Song Name:{ s.songName }</div>
			<div>Artist:{ s.artist }</div>
		</li>		
	  )
    })

    return (
      <div>
        <div className="card">
          <div className="card-content">
            <ul >
              {currentSong}
            </ul>
          </div>
        </div>      
      </div>
    )
  }

}
MyComponents.CurrentSong = CurrentSong