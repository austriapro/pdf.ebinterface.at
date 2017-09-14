import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Mockup from "./Mockup";

import './wkostyle.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
      loading: true,
    };
  //  this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
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

 /* handleChange(e) {
    this.setState({
      name: e.target.value,
      email: e.target.value
    });
  }
*/
  addUser(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let email = this.refs.email.value;
  //  let nextuuid = this.state.users[this.state.uuid] + 1;
      this.setState({
        users: this.state.users.concat({ name, email})
      });
  }
  render(){


  //  return <Mockup name={"Yes"}/>;

    if (this.state.loading === true) {
      return (
        <div>Loading...</div>
      )}

    else if (this.state.loading === false) {
      return (
        <div>
          <table>
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>eMail</th>
            </tr>

          {this.state.users.map(item => {
            return (
              <tr>
                <th>{item.uuid}</th>
                <th>{item.name}</th>
                <th>{item.email}</th>
              </tr>
//              <div key={item.uuid}>{JSON.stringify(item)}</div>
            )
          })}
          </table>
          <form onSubmit={this.addUser}>
          <table>
            <tr>
              <th>Name</th>
              <th>eMail</th>
            </tr>

            <tr>
              <th><input type="text" ref="name" /></th>
              <th><input type="text" ref="email" /></th>
            </tr>

            <button type="submit">Save User</button>
          </table>
          </form>
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
