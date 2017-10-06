import React, {Component} from 'react';

class FileUp extends Component {
  constructor(props){
    super(props);

    this.state ={
      dragged: false,
      submited: false,
    }

    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragleave_handler = this.dragleave_handler.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    //this.drop_handler = this.drop_handler.bind(this);
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

  dragleave_handler(e){
    e.preventDefault();
    console.log("File Leaves the Line");
    this.setState({
      dragged: false,
    })
  }

  /*drop_handler(e) {

    console.log(e.target.files[0]);

    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('name', e.target.files[0].name);
    console.log(e.target.files[0].name);

    fetch("/api/convert/", {
      method: "POST",
      body: data
    }).then(result => {
      if (result.status === 200){
        this.setState({
          submited: true,

        })
      }
      console.log('done');
      console.log(this.state.submited);
    })
  }*/

  onFileChange(e){

    console.log(e.target.files[0]);
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('name', e.target.files[0].name);
    console.log(e.target.files[0].name);

    fetch("/api/convert/", {
      method: "POST",
      body: data
    }).then(result => {
      if (result.status === 200){
        this.setState({
          submited: true,
        })
      }
      console.log('done');
      console.log(this.state.submited);
      console.log()
    })
  }

  pdfDownload(e){
    e.preventDefault();

  }

  render() {
    console.log(this.state.submited);
    let spanText = "";
    let outerClassName = "file-up";
    let downloadButton;

    if (this.state.dragged === false) {
    } else {
      spanText = "Legen Sie die Datei hier ab!";
      outerClassName = "file-up dragged";
    }

    if (this.state.submited === false) {
    } else {
      downloadButton =<button onClick={this.pdfDownload}>Download PDF</button>;
    }
      return (
        <div className={outerClassName} onDragOver={this.dragover_handler} onDragLeave={this.dragleave_handler} onDrop={this.drop_handler}>
          <div className="container">
            <div className="row">
              <form>
                <span>
                <input type="file" accept="text/xml" onChange={this.onFileChange}/>
                  {downloadButton}
                </span>
                <span>
                  {spanText}
                </span>
              </form>
            </div>
          </div>
        </div>
      );
    }
}

export default FileUp;
