import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
      loading: true,
    };
  }

  componentDidMount(){
    fetch("/api/dummies/")
      .then(response => {
        if (response.status === 200) {
          response.json().then(users => {
          console.log(users);
            this.setState({
              users: users,
              loading: false,
              error: null,
            })
          });
        }
      });
  }

/*  componentDidMount(){
    let $component = this;
    fetch("/api/dummies/")
      .then(function(response) {
        if (response.status === 200) {
          response.json().then(function(users){
            console.log(users);
            $component.setState({
              users: users,
              loading: false,
              error: null,
            })
          });
        }
        else{}
      });
  }*/

  render(){
    if (this.state.loading === true) {
      return (
        <div>Loading...</div>
      )}

    else if (this.state.loading === false) {
      return (
        <div>
          {this.state.users.map(item => {
            return (
              <div key={item.uuid}>{JSON.stringify(item)}</div>
            )
          })}
        </div>
      )}

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
