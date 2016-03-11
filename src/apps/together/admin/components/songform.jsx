class SongForm extends React.Component {
  render(){
    if (this.props.user) {
      return (
        <div className="card">
          <div className="card grey darken-3">
            <div className="card-content white-text">
              <span className="card-title">SUGGEST A SONG!</span>
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
                <a className="waves-effect waves-light btn blue-grey">Submit</a>
              </div>
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