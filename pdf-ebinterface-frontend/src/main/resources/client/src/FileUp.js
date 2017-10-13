import React, {Component} from 'react';

class FileUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragged: false,
      loading: false,
      downloadUrl: null,
      submitted: false,
    }

    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragleave_handler = this.dragleave_handler.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
  }

  dragover_handler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    console.log("File Crossed the Line");
    this.setState({
      dragged: true,
    })
  }

  dragleave_handler(e) {
    e.preventDefault();
    console.log("File Leaves the Line");
    this.setState({
      dragged: false,
    })
  }

  submit_handler(file) {
    if (!file) {
      return;
    }
    this.setState({
      dragged: false
    });
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('name', file.name);
    console.log("File " + file);
    this.setState({
      loading: true,
    })
    fetch("/api/convert/", {
      method: "POST",
      body: formdata
    }).then(result => {
      if (result.status === 200) {
        result.json().then(fileResult => {
          const url = `/api/convert/${fileResult.uuid}`;
          this.setState({
            downloadUrl: url,
            loading: false,
            submitted: true,
          });
        })
      }
    })
    console.log("submitted " + this.state.submitted);
    console.log("dragged " + this.state.dragged);
  }

  drop_handler(e) {
    e.preventDefault();
    this.submit_handler(e.dataTransfer.files[0]);
  }

  onFileChange(e) {
    e.preventDefault();
    this.submit_handler(e.target.files[0]);
  }

  render() {

    let spanText = "";
    let outerClassName = "file-up";
    let downloadButton;
    let loading;

    //wenn man mit der Datei über das rote Fenster zieht wird diese Bedingung ausgelöst
    if (this.state.dragged === true) {
      spanText = "Legen Sie die Datei hier ab!";
      outerClassName += " dragged";
    }
    //diese Bedingung wird ausgeführt wenn wir einen positiven respond vom Server zurückbekommen und der Download Link wir dann eingeblendet
    if (this.state.submitted === true) {
      downloadButton = <a href={this.state.downloadUrl} target="_blank">Download PDF</a>;
    }

    //Preloader wird aktiviert
    if (this.state.loading === true) {
      loading = <div className="loading-circle-1"></div>;
    }

    console.log(outerClassName);
    return (
      <div className={outerClassName} onDragOver={this.dragover_handler} onDragLeave={this.dragleave_handler}
           onDrop={this.drop_handler}>
        <div className="container">
          <div className="row">
            <form>
              <div className="uploadFile  col-md-4">
                <input type="file" id="file" accept="text/xml" onChange={this.onFileChange} className="inputfile"/>
                <label htmlFor="file">Wählen Sie eine XML Datei aus</label>
              </div>
            </form>
            <div className="pdf-loading col-md-4">
              {loading}
            </div>
            <div className="col-md-4 pdf-link">
              <div>
                {downloadButton}
              </div>
              <div>
                {spanText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUp;
