class SongForm extends React.Component {
  render(){
    if (this.props.user) {
      return (
        <div>
          <div className="card"> 
            <div className="card-content">
              <div className="row">
                <div className="col s1"><i className="small material-icons">queue</i></div>
                <div className="col s6"><h6>Suggest a Song</h6></div>
                <div className="progress ">
                  <div className="determinate"></div>
                </div>
              </div>
      
              <ul>
                <div className="row">
                  <div className="input-field col m12 s12">
                    <input placeholder="Song Name (Required)" id="songName" type="text" className="validate"/>
                  </div>
                  <div className="input-field col m6 s12">
                    <input placeholder="Artist (Required)" id="artist" className="validate" type="text"/>
                  </div>
                  <div className="file-path-wrapper input-field col m6 s12">
                    <input placeholder="Album (Optional)" id="album" className="file-path validate" type="text"/>
                  </div>
                </div>
                <div className="card-action">
                  <a className="waves-effect waves-light btn blue-grey" onClick={this.props.actions.submitSong}>Submit</a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    else {
      return(<div></div>)
    } 
  }
}

MyComponents.SongForm = SongForm