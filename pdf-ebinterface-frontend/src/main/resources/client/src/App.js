import React, {Component} from 'react';
import './App.css';
import Mockup from "./Mockup";
import Dropzone from 'knock-dropzone';
import './wkostyle.css';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      }
    };


  render() {

    return (
     <div>
       <Mockup />
     </div>
    );
  }
}

export default App;
