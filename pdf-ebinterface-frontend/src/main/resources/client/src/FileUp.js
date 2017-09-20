import React, {Component} from 'react';

class FileUp extends Component {
  constructor(props){
    super(props);

    this.state ={
      dragged: false,
    }

    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragstart_handler = this.dragstart_handler.bind(this);
    this.dragleave_handler = this.dragleave_handler.bind(this);
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
    this.setState({
      dragged: false,
    })
  }

  dragstart_handler(e) {

  }

  render() {

    let spanText = "Keine Ausgewählt";
    let outerClassName = "file-up";
    if (this.state.dragged === false) {
    }
    else{
      spanText = "Legen Sie die Datei hier ab!";
      outerClassName = "file-up dragged";
    }
      return (
        <div className={outerClassName} onDragOver={this.dragover_handler} onDragLeave={this.dragleave_handler} onDragStart={this.dragstart_handler}>
          <div className="container">
            <div className="row">
              <form>
                <button className="OneAndOnlyButton" type="text">Datei auswählen</button>
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
