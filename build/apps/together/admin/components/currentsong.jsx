
class CurrentSong extends React.Component {
  render(){
  	
  	var currentSong = this.props.currentSong.map(function(s,i){
      // TODO - Figure out how to order these by upvotes minus downvotes
      return (
		    <li key={i}>
				<div>Song Name: { s.songName }</div>
				<div>Artist: { s.artist }</div>
		    </li>		
      )
    })

    return (
      <div>
        <div className="card"> 
          <div className="card-content">
		        <div className="row">
              <div className="col s1"><i className="small material-icons">play_circle_outline</i></div>
              <div className="col s6"><h6>Current Song</h6></div>
              <div className="progress ">
				        <div className="determinate"></div>
              </div>
		        </div>
            <ul>
			 { currentSong }
            </ul>
          </div>
        </div>      
      </div>
    )
  }

}
MyComponents.CurrentSong = CurrentSong