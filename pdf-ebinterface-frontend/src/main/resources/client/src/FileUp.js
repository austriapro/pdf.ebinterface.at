import React, {Component} from 'react';

class FileUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragged: false,
      dropped: false,
      submitted: false,
      downloadUrl: null,
    }

    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragleave_handler = this.dragleave_handler.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
    this.pdfDownload = this.pdfDownload.bind(this);
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
    this.setState({dropped: true});

    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('name', file.name);

    fetch("/api/convert/", {
      method: "POST",
      body: formdata
    }).then(result => {
      if (result.status === 200) {
        result.json().then(fileResult => {

          const url = `/api/convert/${fileResult.uuid}`;
          this.setState({downloadUrl: url, submitted: true});

        })
      }
    })
  }

  drop_handler(e) {

    e.preventDefault();
    this.submit_handler(e.dataTransfer.files[0]);
  }

  onFileChange(e) {

    e.preventDefault();
    this.submit_handler(e.target.files[0]);
  }

  pdfDownload(e) {
    e.preventDefault();
  }

  render() {
    console.log(this.state.submitted);
    let spanText = "";
    let outerClassName = "file-up";
    let downloadButton;
    let loading;

    if (this.state.dragged === false) {
    } else {
      spanText = "Legen Sie die Datei hier ab!";
      outerClassName = "file-up dragged";
    }

    if (this.state.submitted === false) {
    } else {
      downloadButton = <a href={this.state.downloadUrl} target="_blank">Download PDF</a>;
      outerClassName = "file-up";
      spanText = "";
    }

    if (this.state.submitted === false && this.state.dropped === true)
    {
      loading = <div className="loading-circle-1"></div>;
    }


    return (
      <div>
        <div className={outerClassName} onDragOver={this.dragover_handler} onDragLeave={this.dragleave_handler}
             onDrop={this.drop_handler}>

          <div className="container">
            <div className="row">
              <div className="pdf-loading col-md-4 col-md-push-4">
                {loading}
              </div>
              <form>
                <input type="file" accept="text/xml" onChange={this.onFileChange} className="col-md-4 col-md-pull-4"/>
                <span>
                  {downloadButton}
                </span>
                <span>
                  {spanText}
              </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUp;
